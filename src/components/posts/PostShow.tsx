import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

type PostShowProps = {
    postId: string;
};

const PostShow: React.FC<PostShowProps> = async ({ postId }) => {
    // await new Promise ((resolve) => setTimeout(resolve, 3000)); // 3초 딜레이
    const post = await prisma.post.findFirst({
        where: { id: postId }, // postId 로 검색하기
    });
    if (!post) notFound(); // post 가 없으면 아무것도 표시하지 않음

    return (
        <div>
            <h1 className='font-bold text-2xl'>{post.title}</h1>
            <p className='border rounded p-4'>{post.content}</p>
        </div>
    );
};
export default PostShow;
