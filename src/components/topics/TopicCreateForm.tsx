'use client'; //  useActionState 사용때문에 클라이언트 함수 선언
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
import { createTopics } from '@/actions/create-topics'; //  서버 액션 createTopics 추출
import { useActionState } from 'react'; //  추가

const TopicCreateForm = () => {
    const [formState, action] = useActionState(createTopics, {
        errors: {},
    });

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>New Topic</Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                {/*  form action 속성에 createTopics 서버액션함수 적용, 트리거는 form 으로 감싸면 안됨  */}
                <form action={action}>
                    <DialogHeader>
                        <DialogTitle>Create a Topic</DialogTitle>
                        <DialogDescription>
                            Write a new topic to start discussion. Click save
                            when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className='grid gap-4 py-4'>
                        <div>
                            <Label htmlFor='name'>Name</Label>
                            <Input id='name' name='name' />
                        </div>
                        {formState.errors.name && (
                            <p className='text-sm text-red-600'>
                                {formState.errors.name}
                            </p>
                        )}
                        <div>
                            <Label htmlFor='description'>Description</Label>
                            <Textarea id='description' name='description' />
                        </div>
                        {formState.errors.description && (
                            <p className='text-sm text-red-600'>
                                {formState.errors.description}
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
export default TopicCreateForm;
