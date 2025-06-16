import { Input } from '../ui/input';
import { auth } from '@/auth'; // NextAuth 설정 가져옴
import AuthHeader from './AuthHeader'; // 인증 헤더 가져옴

const HeaderPage = async () => {
    return (
        <div className='grid grid-cols-3 items-center h-16'>
            <div className='flex justify-start'>
                <h1 className='font-bold text-xl'>Discuss</h1>
            </div>
            <div className='flex justify-center'>
                <Input type='text' placeholder='Search post...' />
            </div>
            <div className='flex justify-end gap-2'>
                <AuthHeader />
            </div>
        </div>
    );
};
export default HeaderPage;
