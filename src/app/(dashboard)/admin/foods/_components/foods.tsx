'use client';

import DataTable from '@/components/common/datatable';
import DropdownAction from '@/components/common/dropdown-action';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import useDataTable from '@/hooks/use-datatable';
import { createClient } from '@/lib/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Pencil, Trash2, Image as ImageIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { HEADER_TABLE_FOODS } from '@/constants/foods-constant';
import DialogCreateFoods from './dialog-create-food';
import DialogUpdateFoods from './dialog-update-food';
import DialogDeleteFoods from './dialog-delete-food';
import { CategorySelectItem, getCategoriesForSelect } from '../actions';
import type { Foods } from '@/validations/foods-validation';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Foods() {
    const supabase = createClient();
    const {
        currentPage,
        currentLimit,
        currentSearch,
        handleChangePage,
        handleChangeLimit,
        handleChangeSearch,
    } = useDataTable();

    const {
        data: foods,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['foods', currentPage, currentLimit, currentSearch],
        queryFn: async () => {
            const query = supabase
                .from('foods')
                .select('*', { count: 'exact' })
                .range((currentPage - 1) * currentLimit, currentPage * currentLimit - 1)
                .order('created_at', { ascending: false });

            if (currentSearch) {
                query.or(`name.ilike.%${currentSearch}%`);
            }

            const result = await query;

            if (result.error)
                toast.error('Get Foods data failed', {
                    description: result.error.message,
                });

            return result;
        },
    });

    const { data: categoryList = [], isLoading: isLoadingFoodsList } = useQuery<CategorySelectItem[]>({
        queryKey: ['categoriesForSelect'],
        queryFn: getCategoriesForSelect,
    });

    const [selectedAction, setSelectedAction] = useState<{
        data: Foods;
        type: 'update' | 'delete';
    } | null>(null);

    const handleChangeAction = (open: boolean) => {
        if (!open) setSelectedAction(null);
    };

    const filteredData = useMemo(() => {
        return (foods?.data || []).map((foods: Foods, index) => {
            const uniqueKey = `${foods.id}-${index}`;

            const categoryName = categoryList.find((c) => c.value === foods.category_id)?.label || foods.category_id;

            return [
                currentLimit * (currentPage - 1) + index + 1,
                <div key={`avatar-${uniqueKey}`} className="flex items-center gap-2">
                    <Avatar className="h-10 w-10 rounded">
                        <AvatarImage
                            src={foods.image_url || ""}
                            alt={foods.name}
                            className="object-cover"
                        />
                        <AvatarFallback className="rounded bg-muted">
                            <ImageIcon className="h-4 w-4 text-muted-foreground" />
                        </AvatarFallback>
                    </Avatar>
                </div>,
                <div key={`name-${uniqueKey}`} className="flex items-center gap-2">
                    {foods.name}
                </div>,
                <div key={`name-${uniqueKey}`} className="flex items-center gap-2">
                    {foods.description}
                </div>,
                <span key={`category-${uniqueKey}`}>{categoryName}</span>,
                <DropdownAction
                    key={`action-${uniqueKey}`}
                    menu={[
                        {
                            label: (
                                <span className="flex items-center gap-2">
                                    <Pencil /> Edit
                                </span>
                            ),
                            action: () => {
                                setSelectedAction({
                                    data: foods,
                                    type: 'update',
                                });
                            },
                        },
                        {
                            label: (
                                <span className="flex items-center gap-2">
                                    <Trash2 className="text-red-400" /> Delete
                                </span>
                            ),
                            variant: 'destructive',
                            action: () => {
                                setSelectedAction({
                                    data: foods,
                                    type: 'delete',
                                });
                            },
                        },
                    ]}
                />,
            ];
        });
    }, [foods, currentPage, currentLimit, categoryList]);

    const totalPages = useMemo(() => {
        return foods && foods.count !== null
            ? Math.ceil(foods.count / currentLimit)
            : 0;
    }, [foods, currentLimit]);

    return (
        <div className="w-full">
            <div className="flex flex-col lg:flex-row mb-4 gap-2 justify-between w-full">
                <h1 className="text-2xl font-bold">Foods Management</h1>
                <div className="flex gap-2">
                    <Input
                        placeholder="Search..."
                        onChange={(e) => handleChangeSearch(e.target.value)}
                    />
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" disabled={isLoadingFoodsList}>
                                {isLoadingFoodsList ? 'Loading...' : 'Create'}
                            </Button>
                        </DialogTrigger>

                        <DialogCreateFoods
                            refetch={refetch}
                            categoryList={categoryList}
                        />
                    </Dialog>
                </div>
            </div>

            <DataTable
                header={HEADER_TABLE_FOODS}
                data={filteredData}
                isLoading={isLoading}
                totalPages={totalPages}
                currentPage={currentPage}
                currentLimit={currentLimit}
                onChangePage={handleChangePage}
                onChangeLimit={handleChangeLimit}
            />

            {selectedAction?.type === 'update' && (
                <DialogUpdateFoods
                    open={true}
                    refetch={refetch}
                    currentData={selectedAction.data}
                    handleChangeAction={handleChangeAction}
                    categoryList={categoryList}
                />
            )}

            {selectedAction?.type === 'delete' && (
                <DialogDeleteFoods
                    open={true}
                    refetch={refetch}
                    currentData={selectedAction.data}
                    handleChangeAction={handleChangeAction}
                />
            )}
        </div>
    );
}