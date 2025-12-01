/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
    INITIAL_SIGNIN_FORM,
    INITIAL_STATE_SIGNIN_FORM,
} from '@/constants/auth-constant';
import { SignInForm, signinSchemaForm } from '@/validations/auth-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState, useEffect } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { signin } from '../actions';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface FormInputProps {
    form: UseFormReturn<any>;
    name: string;
    label: string;
    placeholder?: string;
    type?: string;
}

const FormInput = ({ form, name, label, placeholder, type }: FormInputProps) => {
    const { register, formState: { errors } } = form;
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium">{label}</label>
            <input
                {...register(name)}
                type={type}
                placeholder={placeholder}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            {errors[name] && (
                <p className="text-sm text-red-500">
                    {errors[name]?.message as string}
                </p>
            )}
        </div>
    );
};

export default function SignIn() {
    const form = useForm<SignInForm>({
        resolver: zodResolver(signinSchemaForm),
        defaultValues: INITIAL_SIGNIN_FORM,
    });

    const [signinState, signinAction, isPendingSignIn] = useActionState(
        signin,
        INITIAL_STATE_SIGNIN_FORM,
    );

    const onSubmit = form.handleSubmit(async (data) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });

        startTransition(() => {
            signinAction(formData);
        });
    });

    useEffect(() => {
        if (signinState?.status === 'error') {
            toast.error('SignIn Failed', {
                description: signinState.errors?._form?.[0] || 'An unknown error occurred.',
            });
            startTransition(() => {
                signinAction(null);
            });
        }
    }, [signinState, signinAction]);

    return (
        <div className="max-w-md mx-auto mt-10 rounded-xl border border-gray-200 bg-white text-gray-950 shadow-sm w-full">
            <div className="flex flex-col space-y-1.5 p-6 text-center">
                <h3 className="font-semibold tracking-tight text-2xl">
                    Welcome
                </h3>
                <p className="text-sm text-gray-500">
                    Sign In to Get Access 
                </p>
            </div>

            <div className="p-6 pt-0">
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

                    <button
                        type="submit"
                        disabled={isPendingSignIn}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-900 text-gray-50 hover:bg-gray-900/90 h-10 px-4 py-2 w-full"
                    >
                        {isPendingSignIn ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'SignIn'}
                    </button>
                </form>
            </div>
        </div>
    );
}