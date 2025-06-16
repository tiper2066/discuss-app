import TopicCreateForm from '@/components/topics/TopicCreateForm';

export default function Home() {
    return (
        <div className='grid grid-cols-4 gap-4 p-4'>
            <div className='col-span-3'>
                <h1 className='font-bold text-xl'>Home Page</h1>
            </div>
            <div className='flex justify-end'>
                <TopicCreateForm />
            </div>
        </div>
    );
}
