import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { updateCategory, CategorySelectItem } from '../actions';
import { toast } from 'sonner';
import FormCategory from './form-category';
import { Dialog } from '@/components/ui/dialog';
import { Category, CategoryForm, categoryFormSchema } from '@/validations/category-validation';
import { INITIAL_STATE_CATEGORY } from '@/constants/category-constant';

export default function DialogUpdateCategory({
    refetch,
    currentData,
    open,
    handleChangeAction,
    categoryList,
}: {
    refetch: () => void;
    currentData?: Category;
    open?: boolean;
    handleChangeAction?: (open: boolean) => void;
    categoryList: CategorySelectItem[];
}) {
    const form = useForm<CategoryForm>({
        resolver: zodResolver(categoryFormSchema),
        defaultValues: {
            name: '',
            slug: '',
            description: '',
        },
    });

    const [updateCategoryState, updateCategoryAction, isPendingUpdateCategory] =
        useActionState(updateCategory, INITIAL_STATE_CATEGORY);

    const onSubmit = form.handleSubmit((data) => {
        const formData = new FormData();

        for (const key in data) {
            if (
                Object.prototype.hasOwnProperty.call(data, key) &&
                data[key as keyof CategoryForm] !== undefined &&
                data[key as keyof CategoryForm] !== null
            ) {
                formData.append(key, String(data[key as keyof CategoryForm]));
            }
        }

        formData.append('id', currentData?.id ?? '');

        startTransition(() => {
            updateCategoryAction(formData);
        });
    });

    useEffect(() => {
        if (updateCategoryState?.status === 'error') {
            const errors = updateCategoryState.errors;
            const formErrors = errors?._form;

            if (formErrors && formErrors.length > 0) {
                toast.error('Update Category Failed', {
                    description: formErrors[0],
                });
            }

            if (errors) {
                Object.keys(errors).forEach(key => {
                    const fieldName = key as keyof CategoryForm;
                    if (errors[fieldName]) {
                        form.setError(fieldName, {
                            type: 'server',
                            message: errors[fieldName]?.[0] || 'Server error',
                        });
                    }
                });
            }
        }

        if (updateCategoryState?.status === 'success') {
            toast.success('Update Category Success');
            form.reset();
            handleChangeAction?.(false);
            refetch();
        }
    }, [updateCategoryState, form, handleChangeAction, refetch]);

    useEffect(() => {
        if (currentData) {
            form.reset({
                name: currentData.name,
                slug: currentData.slug || '',
                description: currentData.description || '',
                parent_id: currentData.parent_id || '',
            });
        }
    }, [currentData, form]);

    return (
        <Dialog open={open} onOpenChange={handleChangeAction}>
            <FormCategory
                form={form}
                onSubmit={onSubmit}
                isLoading={isPendingUpdateCategory}
                type="Update"
                categoryList={categoryList}
            />
        </Dialog>
    );
}