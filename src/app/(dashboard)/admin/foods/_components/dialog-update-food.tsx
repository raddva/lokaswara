/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { updateFoods, CategorySelectItem } from '../actions';
import { toast } from 'sonner';
import FormFoods from './form-foods';
import { Dialog } from '@/components/ui/dialog';
import { Foods, foodsFormSchema } from '@/validations/foods-validation';
import { INITIAL_STATE_FOODS } from '@/constants/foods-constant';
import { Preview } from '@/types/general';
import { z } from 'zod';

const updateFormSchema = foodsFormSchema.extend({
    image_url: z.union([z.string(), z.instanceof(File), z.null()]).optional(),
});

type UpdateFoodsFormValues = z.infer<typeof updateFormSchema>;

export default function DialogUpdateFoods({
    refetch,
    currentData,
    open,
    handleChangeAction,
    categoryList,
}: {
    refetch: () => void;
    currentData?: Foods;
    open?: boolean;
    handleChangeAction?: (open: boolean) => void;
    categoryList: CategorySelectItem[];
}) {
    const [preview, setPreview] = useState<Preview>({
        file: null,
        displayUrl: null,
    });

    const form = useForm<UpdateFoodsFormValues>({
        resolver: zodResolver(updateFormSchema),
        defaultValues: {
            name: '',
            description: '',
            ingredients: '',
            tutorial: '',
            category_id: '',
            image_url: undefined,
        },
    });

    const [updateFoodsState, updateFoodsAction, isPendingUpdateFoods] =
        useActionState(updateFoods, INITIAL_STATE_FOODS);

    useEffect(() => {
        if (currentData) {
            form.reset({
                name: currentData.name,
                description: currentData.description || '',
                ingredients: currentData.ingredients || '',
                tutorial: currentData.tutorial || '',
                category_id: currentData.category_id || '',
                image_url: undefined,
            });

            setPreview({
                file: null,
                displayUrl: currentData.image_url || null,
            });
        }
    }, [currentData, form]);

    useEffect(() => {
        if (!updateFoodsState || updateFoodsState === INITIAL_STATE_FOODS) return;

        if (updateFoodsState.status === 'error') {
            const errors = updateFoodsState.errors;
            const formErrors = errors?._form;

            if (formErrors && formErrors.length > 0) {
                toast.error('Update Foods Failed', { description: formErrors[0] });
            }
            if (errors) {
                Object.keys(errors).forEach(key => {
                    const fieldName = key as keyof UpdateFoodsFormValues;
                    if (errors[fieldName as keyof typeof errors]) {
                        form.setError(fieldName, {
                            type: 'server',
                            message: errors[fieldName as keyof typeof errors]?.[0] || 'Server error',
                        });
                    }
                });
            }
        }

        if (updateFoodsState.status === 'success') {
            toast.success('Update Foods Success');
            handleChangeAction?.(false);
            refetch();
        }
    }, [updateFoodsState, handleChangeAction, refetch, form]);

    const onSubmit = form.handleSubmit((data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('ingredients', data.ingredients);
        formData.append('tutorial', data.tutorial);
        formData.append('category_id', data.category_id);
        formData.append('id', currentData?.id ?? '');

        const imageFile = data.image_url;
        if (imageFile instanceof File) {
            formData.append('image_url', imageFile);
        } else if (Array.isArray(imageFile) && imageFile[0] instanceof File) {
            formData.append('image_url', imageFile[0]);
        }

        startTransition(() => {
            updateFoodsAction(formData);
        });
    });

    return (
        <Dialog open={open} onOpenChange={handleChangeAction}>
            <FormFoods
                form={form as any}
                onSubmit={onSubmit}
                isLoading={isPendingUpdateFoods}
                type="Update"
                categoryList={categoryList}
                preview={preview}
                setPreview={setPreview}
            />
        </Dialog>
    );
}