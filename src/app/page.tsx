import TopicCreateForm from '@/components/topics/TopicCreateForm';
import PostList from '@/components/posts/PostList'; //  추가
import { fetchTopPosts } from '@/lib/query/post'; //  추가

export default function Home() {
    return (
        <div className='grid grid-cols-4 gap-4 p-4'>
            <div className='col-span-3'>
                <h1 className='font-bold text-xl'>Home Page</h1>
                {/*  PostList 컴포넌트에 쿼리 전달 */}
                <PostList fetchData={fetchTopPosts} />
            </div>
            <div className='flex justify-end'>
                <TopicCreateForm />
            </div>
        </div>
    );
}
