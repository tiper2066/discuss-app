import type { Post } from '@/generated/prisma'; // PrismaClient 객체에서 Post 타입 추출
import { prisma } from '../prisma';

// Post 객체 데이터 타입 선언
export type PostWithData = Post & {
    topic: {
        slug: string;
    };
    _count: {
        comments: number;
    };
    user: {
        name: string | null;
    };
};

export const fetchPostByTopicSlug = async (
    slug: string
): Promise<PostWithData[]> => {
    return await prisma.post.findMany({
        where: { topic: { slug } },
        include: {
            topic: { select: { slug: true } },
            _count: { select: { comments: true } },
            user: { select: { name: true } },
        },
    });
};
