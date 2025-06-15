import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { LogOut } from 'lucide-react';
import { signIn } from '@/actions/sign-in';
import { signOut } from '@/actions/sign-out';
import { auth } from '@/auth'; // NextAuth 설정 가져옴

const HeaderPage = async () => {
    const session = await auth(); // NextAuth 세션 정보 구하기
    return (
        <div className="grid grid-cols-3 items-center h-16">
            <div className="flex justify-start">
                <h1 className="font-bold text-xl">Discuss</h1>
            </div>
            <div className="flex justify-center">
                <Input type="text" placeholder="Search post..." />
            </div>
            <div className="flex justify-end gap-2">
                {/* session user 라면.... 아바타를 표시하고.... */}
                {session?.user ? (
                    <Popover>
                        <PopoverTrigger asChild>
                            <Avatar>
                                <AvatarImage
                                    src={session.user.image || ''}
                                    alt="@shadcn"
                                />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent>
                            <h1 className="font-bold text-lg">
                                {session.user.name}
                            </h1>
                            <Separator className="my-2" />
                            <form action={signOut}>
                                <Button type="submit">
                                    <LogOut /> Sign out
                                </Button>
                            </form>
                        </PopoverContent>
                    </Popover>
                ) : (
                    // session user 가 아니라면.... 로그인 버튼을 표시한다.
                    <>
                        <form action={signIn}>
                            <Button variant="outline">Sign in</Button>
                        </form>
                        <form action={signIn}>
                            <Button>Sign up</Button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};
export default HeaderPage;

//
// {session?.user && (
//     <div>Sign in User : {JSON.stringify(session.user)}</div>
// )}
