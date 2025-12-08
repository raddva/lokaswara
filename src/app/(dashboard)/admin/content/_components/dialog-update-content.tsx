/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { updateContent, CategorySelectItem } from '../actions';
import { toast } from 'sonner';
import FormContent from './form-content';
import { Dialog } from '@/components/ui/dialog';
import { Content, contentFormSchema } from '@/validations/content-validation';
import { INITIAL_STATE_CONTENT } from '@/constants/content-constant';
import { Preview } from '@/types/general';
import { z } from 'zod';

const updateFormSchema = contentFormSchema.extend({
    featured_image_url: z.union([z.string(), z.instanceof(File), z.null()]).optional(),
});

type UpdateContentFormValues = z.infer<typeof updateFormSchema>;

export default function DialogUpdateContent({
    refetch,
    currentData,
    open,
    handleChangeAction,
    categoryList,
}: {
    refetch: () => void;
    currentData?: Content;
    open?: boolean;
    handleChangeAction?: (open: boolean) => void;
    categoryList: CategorySelectItem[];
}) {
    const [preview, setPreview] = useState<Preview>({
        file: null,
        displayUrl: null,
    });

    const form = useForm<UpdateContentFormValues>({
        resolver: zodResolver(updateFormSchema),
        defaultValues: {
            title: '',
            slug: '',
            body: '',
            category_id: '',
            featured_image_url: undefined,
            publish_status: 'draft',
        },
    });

    const [updateContentState, updateContentAction, isPendingUpdateContent] =
        useActionState(updateContent, INITIAL_STATE_CONTENT);

    useEffect(() => {
        if (currentData) {
            form.reset({
                title: currentData.title,
                slug: currentData.slug || '',
                body: currentData.body || '',
                category_id: currentData.category_id || '',
                publish_status: currentData.publish_status as any,
                featured_image_url: undefined,
            });

            setPreview({
                file: null,
                displayUrl: currentData.featured_image_url || null,
            });
        }
    }, [currentData, form]);

    useEffect(() => {
        if (!updateContentState || updateContentState === INITIAL_STATE_CONTENT) return;

        if (updateContentState.status === 'error') {
            const errors = updateContentState.errors;
            const formErrors = errors?._form;

            if (formErrors && formErrors.length > 0) {
                toast.error('Update Content Failed', { description: formErrors[0] });
            }
            if (errors) {
                Object.keys(errors).forEach(key => {
                    const fieldName = key as keyof UpdateContentFormValues;
                    if (errors[fieldName as keyof typeof errors]) {
                        form.setError(fieldName, {
                            type: 'server',
                            message: errors[fieldName as keyof typeof errors]?.[0] || 'Server error',
                        });
                    }
                });
            }
        }

        if (updateContentState.status === 'success') {
            toast.success('Update Content Success');
            handleChangeAction?.(false);
            refetch();
        }
    }, [updateContentState, handleChangeAction, refetch, form]);

    const onSubmit = form.handleSubmit((data) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('slug', data.slug);
        formData.append('body', data.body);
        formData.append('category_id', data.category_id);
        formData.append('publish_status', data.publish_status);
        formData.append('id', currentData?.id ?? '');

        const imageFile = data.featured_image_url;
        if (imageFile instanceof File) {
            formData.append('featured_image_url', imageFile);
        } else if (Array.isArray(imageFile) && imageFile[0] instanceof File) {
            formData.append('featured_image_url', imageFile[0]);
        }

        startTransition(() => {
            updateContentAction(formData);
        });
    });

    return (
        <Dialog open={open} onOpenChange={handleChangeAction}>
            <FormContent
                form={form as any}
                onSubmit={onSubmit}
                isLoading={isPendingUpdateContent}
                type="Update"
                categoryList={categoryList}
                preview={preview}
                setPreview={setPreview}
            />
        </Dialog>
    );
}