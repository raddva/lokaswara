'use client';

import DataTable from '@/components/common/datatable';
import DropdownAction from '@/components/common/dropdown-action';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import useDataTable from '@/hooks/use-datatable';
import { createClient } from '@/lib/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Pencil, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { HEADER_TABLE_CATEGORY } from '@/constants/category-constant';
import DialogCreateCategory from './dialog-create-category';
import DialogUpdateCategory from './dialog-update-category';
import DialogDeleteCategory from './dialog-delete-category';
import { CategorySelectItem, getCategoriesForSelect } from '../actions';
import { Category } from '@/validations/category-validation';

export default function Categories() {
    const supabase = createClient();
    const {
        currentPage,
        currentLimit,
        currentSearch,
        handleChangePage,
        handleChangeLimit,
        handleChangeSearch,
    } = useDataTable();

    const { data: categories, isLoading, refetch } = useQuery({
        queryKey: ['content_categories', currentPage, currentLimit, currentSearch],
        queryFn: async () => {
            let query = supabase
                .from('content_categories')
                .select(`
                *,
                parent:content_categories(id, name)
            `, { count: 'exact' })
                .range((currentPage - 1) * currentLimit, currentPage * currentLimit - 1)
                .order('created_at');

            if (currentSearch) {
                query = query.or(
                    `name.ilike.%${currentSearch}%,parent.name.ilike.%${currentSearch}%`
                );
            }

            const result = await query;

            if (result.error) {
                toast.error('Failed to fetch Category data', {
                    description: result.error.message,
                });
            }

            return result;
        },
    });

    const { data: categoryList = [], isLoading: isLoadingCategoryList } = useQuery<CategorySelectItem[]>({
        queryKey: ['categoriesForSelect'],
        queryFn: getCategoriesForSelect,
    });


    const [selectedAction, setSelectedAction] = useState<{
        data: Category;
        type: 'update' | 'delete';
    } | null>(null);

    const handleChangeAction = (open: boolean) => {
        if (!open) setSelectedAction(null);
    };

    const filteredData = useMemo(() => {
        return (categories?.data || []).map((category: Category, index) => {
            // const parentName = category.parent?.name || '— Top Level —';

            return [
                currentLimit * (currentPage - 1) + index + 1,
                <div key={`name-${category.id}`} className="flex items-center gap-2">
                    {category.name}
                </div>,
                <span key={`slug-${category.id}`}>{category.slug}</span>,
                <span key={`description-${category.id}`}>{category.description}</span>,
                // <span key={`parent-${category.id}`}>{parentName}</span>,
                <DropdownAction
                    key={`action-${category.id}`}
                    menu={[
                        {
                            label: (
                                <span className="flex items-center gap-2">
                                    <Pencil />
                                    Edit
                                </span>
                            ),
                            action: () => {
                                setSelectedAction({
                                    data: category,
                                    type: 'update',
                                });
                            },
                        },
                        {
                            label: (
                                <span className="flex items-center gap-2">
                                    <Trash2 className="text-red-400" />
                                    Delete
                                </span>
                            ),
                            variant: 'destructive',
                            action: () => {
                                setSelectedAction({
                                    data: category,
                                    type: 'delete',
                                });
                            },
                        },
                    ]}
                />,
            ];
        },
        );
    }, [categories, currentPage, currentLimit]);

    const totalPages = useMemo(() => {
        return categories && categories.count !== null
            ? Math.ceil(categories.count / currentLimit)
            : 0;
    }, [categories, currentLimit]);

    return (
        <div className="w-full">
            <div className="flex flex-col lg:flex-row mb-4 gap-2 justify-between w-full">
                <h1 className="text-2xl font-bold">Category Management</h1>
                <div className="flex gap-2">
                    <Input
                        placeholder="Search..."
                        onChange={(e) => handleChangeSearch(e.target.value)}
                    />
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" disabled={isLoadingCategoryList}>
                                {isLoadingCategoryList ? 'Loading...' : 'Create'}
                            </Button>
                        </DialogTrigger>

                        <DialogCreateCategory
                            refetch={refetch}
                            categoryList={categoryList}
                        />
                    </Dialog>
                </div>
            </div>

            <DataTable
                header={HEADER_TABLE_CATEGORY}
                data={filteredData}
                isLoading={isLoading}
                totalPages={totalPages}
                currentPage={currentPage}
                currentLimit={currentLimit}
                onChangePage={handleChangePage}
                onChangeLimit={handleChangeLimit}
            />

            <DialogUpdateCategory
                open={selectedAction !== null && selectedAction.type === 'update'}
                refetch={refetch}
                currentData={selectedAction?.data}
                handleChangeAction={handleChangeAction}
                categoryList={categoryList}
            />
            <DialogDeleteCategory
                open={selectedAction !== null && selectedAction.type === 'delete'}
                refetch={refetch}
                currentData={selectedAction?.data}
                handleChangeAction={handleChangeAction}
            />

        </div>
    );
}