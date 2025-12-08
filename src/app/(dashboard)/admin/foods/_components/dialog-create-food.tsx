/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createFoods } from '../actions';
import { toast } from 'sonner';
import { foodsFormSchema } from '@/validations/foods-validation';
import { INITIAL_CONTENT, INITIAL_STATE_CONTENT } from '@/constants/foods-constant';
import FormFoods from './form-foods';
import { CategorySelectItem } from '../actions';
import { Preview } from '@/types/general';
import { z } from 'zod';

const createFormSchema = foodsFormSchema.extend({
    image_url: z.union([z.string(), z.instanceof(File), z.null()]).optional(),
});

type CreateFoodsFormValues = z.infer<typeof createFormSchema>;

export default function DialogCreateFoods({
    refetch,
    categoryList
}: {
    refetch: () => void;
    categoryList: CategorySelectItem[]
}) {
    const form = useForm<CreateFoodsFormValues>({
        resolver: zodResolver(createFormSchema),
        defaultValues: {
            ...INITIAL_CONTENT,
            image_url: undefined,
        },
    });

    const [createFoodsState, createFoodsAction, isPendingCreateFoods] =
        useActionState(createFoods, INITIAL_STATE_CONTENT);

    const [preview, setPreview] = useState<Preview | undefined>(undefined);

    const onSubmit = form.handleSubmit((data) => {
        const formData = new FormData();

        formData.append('name', data.name);
        formData.append('ingredients', data.ingredients);
        formData.append('tutorial', data.tutorial);
        formData.append('category_id', data.category_id);
        const fileToUpload = preview?.file || data.image_url;

        if (fileToUpload instanceof File) {
            formData.append('image_url', fileToUpload);
        }

        startTransition(() => {
            createFoodsAction(formData);
        });
    });

    useEffect(() => {
        if (createFoodsState?.status === 'error') {
            console.error("Server Error:", createFoodsState.errors);

            const formErrors = createFoodsState.errors?._form;
            if (formErrors && formErrors.length > 0) {
                toast.error('Create Foods Failed', {
                    description: formErrors[0],
                });
            } else {
                const errors = createFoodsState.errors;
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

        if (createFoodsState?.status === 'success') {
            toast.success('Create Foods Success');
            form.reset();
            setPreview(undefined);

            document.querySelector<HTMLButtonElement>('[data-state="open"]')?.click();
            refetch();
        }
    }, [createFoodsState, form, refetch]);

    return (
        <FormFoods
            form={form as any}
            onSubmit={onSubmit}
            isLoading={isPendingCreateFoods}
            type="Create"
            categoryList={categoryList}
            preview={preview}
            setPreview={setPreview}
        />
    );
}