import React from 'react';
import { Card, CardHeader, CardTitle } from '../ui/card';
import { PostWithData } from '@/lib/query/post';

type PostlistProps = {
    fetchData: () => Promise<PostWithData[]>;
};

const PostList: React.FC<PostlistProps> = async ({ fetchData }) => {
    const posts = await fetchData();
    console.log(posts); // 가져온 post 데이터 출력

    return (
        <div className='flex flex-col gap-2'>
            {[1, 2, 3].map((post, idx) => (
                <Card key={idx}>
                    <CardHeader>
                        <CardTitle>DSA New Post</CardTitle>
                    </CardHeader>
                </Card>
            ))}
        </div>
    );
};
export default PostList;
