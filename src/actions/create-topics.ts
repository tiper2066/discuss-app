'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { Topic } from '@/generated/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

// 전달 받을 State 객체 타입 선언
type CreateTopicFormState = {
    errors: {
        name?: string[];
        description?: string[];
        formError?: string[];
    };
};

// 새로 생성되는 Topic 요소의 조건 설정
const createTopicSchema = z.object({
    name: z
        .string() // 문자열로 변환
        .min(3) // 최소 3글자
        .regex(/^[a-z-]+$/, {
            // 공백없이 소문자 영문만됨
            message: 'Must be lowercase letter without spaces',
        }),
    description: z.string().min(10), // 최소 10글자 문자열
});

// 폼으로 부터 요소값을 인자로 전달 받아 처리하는 서버 액션 함수
export const createTopics = async (
    prevState: CreateTopicFormState,
    formData: FormData
): Promise<CreateTopicFormState> => {
    const result = createTopicSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
    });

    // 만약 Zod 이용하여 객체 가져오기 실패면...
    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        };
    }

    const session = await auth();

    if (!session || !session.user) {
        return {
            errors: {
                formError: ['You have to login first!'],
            },
        };
    }

    let topic: Topic; // Topic 테이블 타입 객체 생성
    try {
        topic = await prisma.topic.create({
            data: {
                slug: result.data.name, // slug 경로에 name 할당함
                description: result.data.description,
            },
        });
    } catch (error) {
        if (error instanceof Error) {
            return {
                errors: {
                    formError: [error.message],
                },
            };
        } else {
            return {
                errors: {
                    formError: ['Something went wrong.'],
                },
            };
        }
    }
    revalidatePath('/'); // 홈 경로 재 검증하기
    redirect(`/topics/${topic.slug}`); // 개별 topics 경로로 이동하기
};
