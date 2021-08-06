import { PencilIcon } from '@heroicons/react/solid';
import * as z from 'zod';
import { Button } from '@/components/Elements';
import { Form, FormDrawer, InputField, TextAreaField } from '@/components/Form';
import { usePost } from '../hooks/usePost';
import { useUpdatePost } from '../hooks/useUpdatePost';
import { UnpackNestedValue } from "react-hook-form";
import { PostValues, UpdatePostProps } from "@/features/posts/types";

const schema = z.object({
    title: z.string().min(1, 'Required'),
    body: z.string().min(1, 'Required'),
});

export const UpdatePost = ({ postId }: UpdatePostProps) => {
    const postQuery = usePost({ postId });
    const updatePostMutation = useUpdatePost();

    return (
            <FormDrawer
                isDone={ updatePostMutation.isSuccess }
                triggerButton={
                    <Button startIcon={ <PencilIcon className="h-4 w-4" /> } size="sm">
                        Update Post
                    </Button>
                }
                title="Update Post"
                submitButton={
                    <Button
                        form="update-post"
                        type="submit"
                        size="sm"
                        isLoading={ updatePostMutation.isLoading }
                    >
                        Save
                    </Button>
                }
            >
                <Form<PostValues, typeof schema>
                    id="update-post"
                    onSubmit={ async (values: UnpackNestedValue<PostValues>) => {
                        await updatePostMutation.mutateAsync({ data: values, postId });
                    }}
                    options={{
                        defaultValues: {
                            title: postQuery.data?.title,
                            body: postQuery.data?.body,
                        },
                    }}
                    schema={ schema }
                >
                    {({ register, formState}) => (
                        <>
                            <InputField
                                label="Title"
                                error={ formState.errors['title'] }
                                registration={ register('title') }
                            />
                            <TextAreaField
                                label="Body"
                                error={ formState.errors['body'] }
                                registration={ register('body') }
                            />
                        </>
                    )}
                </Form>
            </FormDrawer>
    );
};
