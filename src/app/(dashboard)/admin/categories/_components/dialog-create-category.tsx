import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createCategory } from '../actions';
import { toast } from 'sonner';
import { CategoryForm, categoryFormSchema } from '@/validations/category-validation';
import { INITIAL_CATEGORY, INITIAL_STATE_CATEGORY } from '@/constants/category-constant';
import FormCategory from './form-category';
import { CategorySelectItem } from '../actions';

export default function DialogCreateCategory({ refetch, categoryList }: { refetch: () => void; categoryList: CategorySelectItem[] }) {
    const form = useForm<CategoryForm>({
        resolver: zodResolver(categoryFormSchema),
        defaultValues: INITIAL_CATEGORY,
    });

    const [createCategoryState, createCategoryAction, isPendingCreateCategory] =
        useActionState(createCategory, INITIAL_STATE_CATEGORY);

    const onSubmit = form.handleSubmit((data) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value == null ? '' : String(value));
        });

        startTransition(() => {
            createCategoryAction(formData);
        });
    });

    useEffect(() => {
        if (createCategoryState?.status === 'error') {
            toast.error('Create Category Failed', {
                description: createCategoryState.errors?._form?.[0],
            });
            console.log(createCategoryState.errors);
        }

        if (createCategoryState?.status === 'success') {
            toast.success('Create Category Success');
            form.reset();
            document.querySelector<HTMLButtonElement>('[data-state="open"]')?.click();
            refetch();
        }
    }, [createCategoryState]);

    return (
        <FormCategory
            form={form}
            onSubmit={onSubmit}
            isLoading={isPendingCreateCategory}
            type="Create"
            categoryList={categoryList}
        />
    );
}