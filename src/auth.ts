import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';
import { prisma } from '@/lib/prisma'; // PrismaClient 객체 추출

// 만일 Guithub 의 인증 ID & SECRET 값이 없으면 에러 메시지 출력
if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
    throw new Error('Missing github client id or client secret');
}

// NextAuth 실행 후 세션 받환받아 핸들러함수, auth, signIn, signOut 함수를 추출하여 사용가능케함
export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    adapter: PrismaAdapter(prisma), // 인증 아답터로 prisma 사용
    // 인증서비스 제공자로 GitHub 사용 (인증 ID, SECRET 키)
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
    ],
    // 인증 시 수행할 함수 정의
    callbacks: {
        // 기존 세션이 있으면 기존 세션 정보 이용하고 없으면 생성해서 반환함
        async session({ user, session }) {
            if (session && user) {
                session.user.id = user.id;
            }
            return session;
        },
    },
});
