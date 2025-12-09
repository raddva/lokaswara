/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { updateImages, CategorySelectItem } from '../actions';
import { toast } from 'sonner';
import FormImages from './form-image';
import { Dialog } from '@/components/ui/dialog';
import { Images, imagesFormSchema } from '@/validations/image-validation';
import { INITIAL_STATE_IMAGES } from '@/constants/images-constant';
import { Preview } from '@/types/general';
import { z } from 'zod';

const updateFormSchema = imagesFormSchema.extend({
    image_url: z.union([z.string(), z.instanceof(File), z.null()]).optional(),
});

type UpdateImagesFormValues = z.infer<typeof updateFormSchema>;

export default function DialogUpdateImages({
    refetch,
    currentData,
    open,
    handleChangeAction,
    categoryList,
}: {
    refetch: () => void;
    currentData?: Images;
    open?: boolean;
    handleChangeAction?: (open: boolean) => void;
    categoryList: CategorySelectItem[];
}) {
    const [preview, setPreview] = useState<Preview>({
        file: null,
        displayUrl: null,
    });

    const form = useForm<UpdateImagesFormValues>({
        resolver: zodResolver(updateFormSchema),
        defaultValues: {
            title: '',
            description: '',
            image_url: undefined,
            category_id: '',
        },
    });

    const [updateImagesState, updateImagesAction, isPendingUpdateImages] =
        useActionState(updateImages, INITIAL_STATE_IMAGES);

    useEffect(() => {
        if (currentData) {
            form.reset({
                title: currentData.title,
                description: currentData.description || '',
                image_url: undefined,
                category_id: currentData.category_id || '',
            });

            setPreview({
                file: null,
                displayUrl: currentData.image_url || null,
            });
        }
    }, [currentData, form]);

    useEffect(() => {
        if (!updateImagesState || updateImagesState === INITIAL_STATE_IMAGES) return;

        if (updateImagesState.status === 'error') {
            const errors = updateImagesState.errors;
            const formErrors = errors?._form;

            if (formErrors && formErrors.length > 0) {
                toast.error('Update Images Failed', { description: formErrors[0] });
            }
            if (errors) {
                Object.keys(errors).forEach(key => {
                    const fieldName = key as keyof UpdateImagesFormValues;
                    if (errors[fieldName as keyof typeof errors]) {
                        form.setError(fieldName, {
                            type: 'server',
                            message: errors[fieldName as keyof typeof errors]?.[0] || 'Server error',
                        });
                    }
                });
            }
        }

        if (updateImagesState.status === 'success') {
            toast.success('Update Images Success');
            handleChangeAction?.(false);
            refetch();
        }
    }, [updateImagesState, handleChangeAction, refetch, form]);

    const onSubmit = form.handleSubmit((data) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('category_id', data.category_id);
        formData.append('id', currentData?.id ?? '');

        const imageFile = data.image_url;
        if (imageFile instanceof File) {
            formData.append('image_url', imageFile);
        } else if (Array.isArray(imageFile) && imageFile[0] instanceof File) {
            formData.append('image_url', imageFile[0]);
        }

        startTransition(() => {
            updateImagesAction(formData);
        });
    });

    return (
        <Dialog open={open} onOpenChange={handleChangeAction}>
            <FormImages
                form={form as any}
                onSubmit={onSubmit}
                isLoading={isPendingUpdateImages}
                type="Update"
                categoryList={categoryList}
                preview={preview}
                setPreview={setPreview}
            />
        </Dialog>
    );
}