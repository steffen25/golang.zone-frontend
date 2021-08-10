import { PlusIcon } from '@heroicons/react/outline';
import * as z from 'zod';
import { Button } from '@/components/Elements';
import { Form, FormDrawer, InputField, TextAreaField } from '@/components/Form';
import { useCreatePost } from '../hooks/useCreatePost';
import { PostValues, PostPolicy } from '@/features/posts';
import { UnpackNestedValue } from 'react-hook-form';
import { Authorization } from '@/lib/Authorization';
import { useAuthStore } from '@/hooks/useAuth';

const schema = z.object({
  title: z.string().min(1, 'Required'),
  body: z.string().min(1, 'Required'),
});

export const CreatePost = () => {
  const createPostMutation = useCreatePost();
  const user = useAuthStore((state) => state.user);

  return (
    <Authorization policy={PostPolicy.canCreate(user)}>
      <FormDrawer
        isDone={createPostMutation.isSuccess}
        triggerButton={
          <Button size="sm" startIcon={<PlusIcon className="h-4 w-4" />}>
            Create Post
          </Button>
        }
        title="Create Post"
        submitButton={
          <Button
            form="create-post"
            type="submit"
            size="sm"
            isLoading={createPostMutation.isLoading}
          >
            Submit
          </Button>
        }
      >
        <Form<PostValues, typeof schema>
          id="create-post"
          onSubmit={async (values: UnpackNestedValue<PostValues>) => {
            await createPostMutation.mutateAsync({ data: values });
          }}
          schema={schema}
        >
          {({ register, formState }) => (
            <>
              <InputField
                label="Title"
                error={formState.errors['title']}
                registration={register('title')}
              />

              <TextAreaField
                label="Body"
                error={formState.errors['body']}
                registration={register('body')}
              />
            </>
          )}
        </Form>
      </FormDrawer>
    </Authorization>
  );
};
