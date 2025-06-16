'use client';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '../ui/textarea';
import { createPost } from '@/actions/create-post';
import { useActionState } from 'react';

type CreatePostFormProps = {
    slug: string;
};

const PostCreateForm: React.FC<CreatePostFormProps> = ({ slug }) => {
    const [formState, action] = useActionState(createPost.bind(null, slug), {
        errors: {},
    });

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>New Post</Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                {/*  form action 속성에 createTopics 서버액션함수 적용, 트리거는 form 으로 감싸면 안됨  */}
                <form action={action}>
                    <DialogHeader>
                        <DialogTitle>Create a Post</DialogTitle>
                        <DialogDescription>
                            Write a new post. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className='grid gap-4 py-4'>
                        <div>
                            <Label htmlFor='title'>Title</Label>
                            <Input id='title' name='title' />
                        </div>
                        {formState.errors.title && (
                            <p className='text-sm text-red-600'>
                                {formState.errors.title}
                            </p>
                        )}
                        <div>
                            <Label htmlFor='content'>Content</Label>
                            <Textarea id='content' name='content' />
                        </div>
                        {formState.errors.content && (
                            <p className='text-sm text-red-600'>
                                {formState.errors.content}
                            </p>
                        )}
                        {formState.errors.formError && (
                            <div className='text-sm text-red-600 border-red-500 bg-red-200 p-2 rounded'>
                                {formState.errors.formError}
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button type='submit' className='w-full'>
                            Save changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
export default PostCreateForm;
