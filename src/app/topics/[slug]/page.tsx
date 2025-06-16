import PostCreateForm from '@/components/posts/PostCreateForm';
import PostList from '@/components/posts/PostList'; //  PostList 컴포넌트 추가
import { fetchPostByTopicSlug } from '@/lib/query/post';

// url 로 전달된 slug 파라미터 타입 선언
type TopicShowPageProps = {
    params: Promise<{ slug: string }>;
};
// slug 파라미터를 받는 컴포넌트 함수
const TopicShowPage = async ({ params }: TopicShowPageProps) => {
    const slug = (await params).slug; // 파라미터에서 slug 값 추출
    return (
        <div className='grid grid-cols-4 gap-4 p-4'>
            <div className='col-span-3'>
                <h1 className='font-bold text-xl'>{slug}</h1>
                {/* ******************* PostList 컴포넌트에 쿼리 전달 */}
                <PostList fetchData={() => fetchPostByTopicSlug(slug)} />
            </div>
            <div className='flex justify-end'>
                <PostCreateForm slug={slug} />
            </div>
        </div>
    );
};
export default TopicShowPage;
