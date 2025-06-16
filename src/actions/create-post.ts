'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { Post } from '@/generated/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

// 전달 받을 State 객체 타입 선언
type CreatePostFormState = {
    errors: {
        title?: string[];
        content?: string[];
        formError?: string[];
    };
};

// 새로 생성되는 Post 요소의 조건 설정
const createPostSchema = z.object({
    title: z.string().min(3), // 최소 3글자 문자열
    content: z.string().min(10), // 최소 10글자 문자열
});

export const createPost = async (
    slug: string,
    prevState: CreatePostFormState,
    formData: FormData
): Promise<CreatePostFormState> => {
    const result = createPostSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content'),
    });

    // 만약 Zod 이용하여 객체 가져오기 실패면...
    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        };
    }

    const session = await auth();

    if (!session || !session.user || !session.user.id) {
        return {
            errors: {
                formError: ['You have to login first!'],
            },
        };
    }

    const topic = await prisma.topic.findFirst({ where: { slug } });

    if (!topic) {
        return {
            errors: {
                formError: ['Topic not found'],
            },
        };
    }

    let post: Post;

    try {
        post = await prisma.post.create({
            data: {
                title: result.data.title,
                content: result.data.content,
                userId: session.user.id,
                topicId: topic.id,
            },
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                errors: {
                    formError: [error.message],
                },
            };
        } else {
            return {
                errors: {
                    formError: ['Failed to create a post.'],
                },
            };
        }
    }
    revalidatePath(`/topics/${slug}`); // 부모 경로 재 검증하기
    redirect(`/topics/${slug}/posts/${post.id}`); // Post 상세 페이지로 이동
};
