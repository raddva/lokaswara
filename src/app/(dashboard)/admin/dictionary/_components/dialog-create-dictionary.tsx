/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createDictionary } from '../actions';
import { toast } from 'sonner';
import { dictionaryFormSchema } from '@/validations/dictionary-validation';
import { INITIAL_DICTIONARY, INITIAL_STATE_DICTIONARY } from '@/constants/dictionary-constant';
import FormDictionary from './form-dictionary';
import { LanguageSelectItem } from '../actions';
import { z } from 'zod';


type CreateDictionaryFormValues = z.infer<typeof dictionaryFormSchema>;

export default function DialogCreateDictionary({
    refetch,
    languageList
}: {
    refetch: () => void;
    languageList: LanguageSelectItem[]
}) {
    const form = useForm<CreateDictionaryFormValues>({
        resolver: zodResolver(dictionaryFormSchema),
        defaultValues: INITIAL_DICTIONARY,
    });

    const [createDictionaryState, createDictionaryAction, isPendingCreateDictionary] =
        useActionState(createDictionary, INITIAL_STATE_DICTIONARY);


    const onSubmit = form.handleSubmit((data) => {
        const formData = new FormData();

        formData.append('word', data.word);
        formData.append('meaning', data.meaning);
        formData.append('synonym', data.synonym);
        formData.append('pronunciation', data.pronunciation);
        formData.append('language_id', data.language_id);

        startTransition(() => {
            createDictionaryAction(formData);
        });
    });

    useEffect(() => {
        if (createDictionaryState?.status === 'error') {
            console.error("Server Error:", createDictionaryState.errors);

            const formErrors = createDictionaryState.errors?._form;
            if (formErrors && formErrors.length > 0) {
                toast.error('Create Dictionary Failed', {
                    description: formErrors[0],
                });
            } else {
                const errors = createDictionaryState.errors;
                if (errors) {
                    Object.keys(errors).forEach((key) => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        const msg = errors[key]?.[0];
                        if (msg) toast.error(`Error in ${key}: ${msg}`);
                    })
                }
            }
        }

        if (createDictionaryState?.status === 'success') {
            toast.success('Create Dictionary Success');
            form.reset();

            document.querySelector<HTMLButtonElement>('[data-state="open"]')?.click();
            refetch();
        }
    }, [createDictionaryState, form, refetch]);

    return (
        <FormDictionary
            form={form as any}
            onSubmit={onSubmit}
            isLoading={isPendingCreateDictionary}
            type="Create"
            languageList={languageList}
        />
    );
}