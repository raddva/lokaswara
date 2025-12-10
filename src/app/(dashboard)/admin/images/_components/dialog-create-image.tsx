/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createImages } from '../actions';
import { toast } from 'sonner';
import { imagesFormSchema } from '@/validations/image-validation';
import { INITIAL_IMAGES, INITIAL_STATE_IMAGES } from '@/constants/images-constant';
import FormImages from './form-image';
import { CategorySelectItem } from '../actions';
import { Preview } from '@/types/general';
import { z } from 'zod';

const createFormSchema = imagesFormSchema.extend({
    image_url: z.union([z.string(), z.instanceof(File), z.null()]).optional(),
});

type CreateImagesFormValues = z.infer<typeof createFormSchema>;

export default function DialogCreateImages({
    refetch,
    categoryList
}: {
    refetch: () => void;
    categoryList: CategorySelectItem[]
}) {
    const form = useForm<CreateImagesFormValues>({
        resolver: zodResolver(createFormSchema),
        defaultValues: {
            ...INITIAL_IMAGES,
            image_url: undefined,
        },
    });

    const [createImagesState, createImagesAction, isPendingCreateImages] =
        useActionState(createImages, INITIAL_STATE_IMAGES);

    const [preview, setPreview] = useState<Preview | undefined>(undefined);

    const onSubmit = form.handleSubmit((data) => {
        const formData = new FormData();

        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('category_id', data.category_id);
        const fileToUpload = preview?.file || data.image_url;

        if (fileToUpload instanceof File) {
            formData.append('image_url', fileToUpload);
        }

        startTransition(() => {
            createImagesAction(formData);
        });
    });

    useEffect(() => {
        if (createImagesState?.status === 'error') {
            console.error("Server Error:", createImagesState.errors);

            const formErrors = createImagesState.errors?._form;
            if (formErrors && formErrors.length > 0) {
                toast.error('Create Images Failed', {
                    description: formErrors[0],
                });
            } else {
                const errors = createImagesState.errors;
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

        if (createImagesState?.status === 'success') {
            toast.success('Create Images Success');
            form.reset();
            setPreview(undefined);

            document.querySelector<HTMLButtonElement>('[data-state="open"]')?.click();
            refetch();
        }
    }, [createImagesState, form, refetch]);

    return (
        <FormImages
            form={form as any}
            onSubmit={onSubmit}
            isLoading={isPendingCreateImages}
            type="Create"
            categoryList={categoryList}
            preview={preview}
            setPreview={setPreview}
        />
    );
}