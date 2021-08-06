import * as z from 'zod';
import { Button } from '@/components/Elements';
import { Form, InputField } from '@/components/Form';
import { useAuth } from '@/lib/auth';
import { UnpackNestedValue } from "react-hook-form";
import { LoginFormProps, LoginValues } from "@/features/auth/types";

const schema = z.object({
    email: z.string().min(1, 'Required'),
    password: z.string().min(1, 'Required'),
});

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
    const { login, isLoggingIn } = useAuth();

    return (
        <div>
            <Form<LoginValues, typeof schema>
                onSubmit={async (values: UnpackNestedValue<LoginValues>) => {
                    await login(values);
                    onSuccess();
                }}
                schema={ schema }
            >
                {({ register, formState}) => (
                    <>
                        <InputField
                            type="email"
                            label="Email Address"
                            error={ formState.errors['email'] }
                            registration={ register('email') }
                        />
                        <InputField
                            type="password"
                            label="Password"
                            error={ formState.errors['password'] }
                            registration={ register('password') }
                        />
                        <div>
                            <Button isLoading={ isLoggingIn } type="submit" className="w-full">
                                Log in
                            </Button>
                        </div>
                    </>
                )}
            </Form>
        </div>
    );
};
