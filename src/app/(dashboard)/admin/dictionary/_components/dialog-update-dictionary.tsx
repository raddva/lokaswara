/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { updateDictionary, LanguageSelectItem } from '../actions';
import { toast } from 'sonner';
import FormDictionary from './form-dictionary';
import { Dialog } from '@/components/ui/dialog';
import { Dictionary, dictionaryFormSchema } from '@/validations/dictionary-validation';
import { INITIAL_STATE_DICTIONARY } from '@/constants/dictionary-constant';
import { z } from 'zod';


type UpdateDictionaryFormValues = z.infer<typeof dictionaryFormSchema>;

export default function DialogUpdateDictionary({
    refetch,
    currentData,
    open,
    handleChangeAction,
    languageList,
}: {
    refetch: () => void;
    currentData?: Dictionary;
    open?: boolean;
    handleChangeAction?: (open: boolean) => void;
    languageList: LanguageSelectItem[];
}) {

    const form = useForm<UpdateDictionaryFormValues>({
        resolver: zodResolver(dictionaryFormSchema),
        defaultValues: {
            word: '',
            meaning: '',
            synonym: '',
            pronunciation: '',
            language_id: '',
        },
    });

    const [updateDictionaryState, updateDictionaryAction, isPendingUpdateDictionary] =
        useActionState(updateDictionary, INITIAL_STATE_DICTIONARY);

    useEffect(() => {
        if (currentData) {
            form.reset({
                word: currentData.word,
                meaning: currentData.meaning || '',
                synonym: currentData.synonym || '',
                pronunciation: currentData.pronunciation || '',
                language_id: currentData.language_id || '',
            });
        }
    }, [currentData, form]);

    useEffect(() => {
        if (!updateDictionaryState || updateDictionaryState === INITIAL_STATE_DICTIONARY) return;

        if (updateDictionaryState.status === 'error') {
            const errors = updateDictionaryState.errors;
            const formErrors = errors?._form;

            if (formErrors && formErrors.length > 0) {
                toast.error('Update Dictionary Failed', { description: formErrors[0] });
            }
            if (errors) {
                Object.keys(errors).forEach(key => {
                    const fieldName = key as keyof UpdateDictionaryFormValues;
                    if (errors[fieldName as keyof typeof errors]) {
                        form.setError(fieldName, {
                            type: 'server',
                            message: errors[fieldName as keyof typeof errors]?.[0] || 'Server error',
                        });
                    }
                });
            }
        }

        if (updateDictionaryState.status === 'success') {
            toast.success('Update Dictionary Success');
            handleChangeAction?.(false);
            refetch();
        }
    }, [updateDictionaryState, handleChangeAction, refetch, form]);

    const onSubmit = form.handleSubmit((data) => {
        const formData = new FormData();
        formData.append('word', data.word);
        formData.append('meaning', data.meaning);
        formData.append('synonym', data.synonym);
        formData.append('pronunciation', data.pronunciation);
        formData.append('language_id', data.language_id);
        formData.append('id', currentData?.id ?? '');

        startTransition(() => {
            updateDictionaryAction(formData);
        });
    });

    return (
        <Dialog open={open} onOpenChange={handleChangeAction}>
            <FormDictionary
                form={form as any}
                onSubmit={onSubmit}
                isLoading={isPendingUpdateDictionary}
                type="Update"
                languageList={languageList}
            />
        </Dialog>
    );
}