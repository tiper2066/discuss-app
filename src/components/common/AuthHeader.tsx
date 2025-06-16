'use client';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';
import { signIn } from '@/actions/sign-in';
import { signOut } from '@/actions/sign-out';
import { useSession } from 'next-auth/react';

const AuthHeader = () => {
    const session = useSession(); // next-auth 세션 정보 구하여 할당

    if (session.status === 'loading') return null;

    // UI 로 사용할 HTML 태그를 담을 변수 선언, HTML 타입은 " React.ReactNode " 임
    let authContent: React.ReactNode;

    // session  user 라면... 로그아웃 메뉴를 포함한 아바타를 표시하고
    if (session.data?.user) {
        authContent = (
            <Popover>
                <PopoverTrigger asChild>
                    <Avatar>
                        <AvatarImage
                            src={session.data.user.image || ''}
                            alt='@shadcn'
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </PopoverTrigger>
                <PopoverContent>
                    <h1 className='font-bold text-lg'>
                        {session.data.user.name}
                    </h1>
                    <Separator className='my-2' />
                    <form action={signOut}>
                        <Button type='submit'>
                            <LogOut /> Sign out
                        </Button>
                    </form>
                </PopoverContent>
            </Popover>
        );
    } else {
        // session user 가 아니라면.... Sign In, Sign Up 버튼을 표시한다.
        authContent = (
            <>
                <form action={signIn}>
                    <Button variant='outline'>Sign in</Button>
                </form>
                <form action={signIn}>
                    <Button>Sign up</Button>
                </form>
            </>
        );
    }

    return authContent;
};
export default AuthHeader;
