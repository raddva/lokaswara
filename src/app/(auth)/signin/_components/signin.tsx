'use client';

import FormInput from '@/components/common/form-input';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import {
    INITIAL_SIGNIN_FORM,
    INITIAL_STATE_SIGNIN_FORM,
} from '@/constants/auth-constant';
import { SignInForm, signinSchemaForm } from '@/validations/auth-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition } from 'react';
import { useForm } from 'react-hook-form';
import { useActionState } from 'react';
import { signin } from '../actions';
import { Loader2 } from 'lucide-react';

export default function SignIn() {
    const form = useForm<SignInForm>({
        resolver: zodResolver(signinSchemaForm),
        defaultValues: INITIAL_SIGNIN_FORM,
    });

    const [signinState, signinAction, isPendingSignIn] = useActionState(
        signin,
        INITIAL_STATE_SIGNIN_FORM
    );

    const onSubmit = form.handleSubmit((data) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });

        startTransition(() => signinAction(formData));
    });

    return (
        <Card>
            <CardHeader className="text-center">
                <CardTitle className="text-xl">Welcome</CardTitle>
                <CardDescription>Sign in to access all features</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <FormInput
                            form={form}
                            name="email"
                            label="Email"
                            placeholder="Insert email here"
                            type="email"
                        />
                        <FormInput
                            form={form}
                            name="password"
                            label="Password"
                            placeholder="******"
                            type="password"
                        />
                        <Button type="submit" disabled={isPendingSignIn}>
                            {isPendingSignIn ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
