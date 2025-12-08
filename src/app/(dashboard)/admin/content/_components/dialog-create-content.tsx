/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createContent } from '../actions';
import { toast } from 'sonner';
import { contentFormSchema } from '@/validations/content-validation';
import { INITIAL_CONTENT, INITIAL_STATE_CONTENT } from '@/constants/content-constant';
import FormContent from './form-content';
import { CategorySelectItem } from '../actions';
import { Preview } from '@/types/general';
import { z } from 'zod';

const createFormSchema = contentFormSchema.extend({
    featured_image_url: z.union([z.string(), z.instanceof(File), z.null()]).optional(),
});

type CreateContentFormValues = z.infer<typeof createFormSchema>;

export default function DialogCreateContent({
    refetch,
    categoryList
}: {
    refetch: () => void;
    categoryList: CategorySelectItem[]
}) {
    const form = useForm<CreateContentFormValues>({
        resolver: zodResolver(createFormSchema),
        defaultValues: {
            ...INITIAL_CONTENT,
            featured_image_url: undefined,
        },
    });

    const [createContentState, createContentAction, isPendingCreateContent] =
        useActionState(createContent, INITIAL_STATE_CONTENT);

    const [preview, setPreview] = useState<Preview | undefined>(undefined);

    const onSubmit = form.handleSubmit((data) => {
        const formData = new FormData();

        formData.append('title', data.title);
        formData.append('slug', data.slug);
        formData.append('body', data.body);
        formData.append('category_id', data.category_id);
        formData.append('publish_status', data.publish_status);
        const fileToUpload = preview?.file || data.featured_image_url;

        if (fileToUpload instanceof File) {
            formData.append('featured_image_url', fileToUpload);
        }

        startTransition(() => {
            createContentAction(formData);
        });
    });

    useEffect(() => {
        if (createContentState?.status === 'error') {
            console.error("Server Error:", createContentState.errors);

            const formErrors = createContentState.errors?._form;
            if (formErrors && formErrors.length > 0) {
                toast.error('Create Content Failed', {
                    description: formErrors[0],
                });
            } else {
                const errors = createContentState.errors;
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

        if (createContentState?.status === 'success') {
            toast.success('Create Content Success');
            form.reset();
            setPreview(undefined);

            document.querySelector<HTMLButtonElement>('[data-state="open"]')?.click();
            refetch();
        }
    }, [createContentState, form, refetch]);

    return (
        <FormContent
            form={form as any}
            onSubmit={onSubmit}
            isLoading={isPendingCreateContent}
            type="Create"
            categoryList={categoryList}
            preview={preview}
            setPreview={setPreview}
        />
    );
}