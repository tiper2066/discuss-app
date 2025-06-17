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

// 최근 Post 가져오기
export const fetchTopPosts = async (): Promise<PostWithData[]> => {
    return prisma.post.findMany({
        orderBy: [
            {
                comments: { _count: 'desc' }, //  코멘트를 기준으로 정렬하고
            },
        ],
        // 현재 topic slug 값과 사용자이름, 코멘트를 가져옴
        include: {
            topic: { select: { slug: true } },
            _count: { select: { comments: true } },
            user: { select: { name: true } },
        },
        take: 5, // 5개 가져옴
    });
};
