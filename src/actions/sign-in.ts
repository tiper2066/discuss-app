'use server';

import * as auth from '@/auth'; // auth.ts에서 추출한 모든 함수 가져옴

// 서버 액션 signIn 함수를 만들고 NextAuth 로 부터 추출, 가져온 signIn 함수를 호출함
export const signIn = async () => {
    return auth.signIn();
};
