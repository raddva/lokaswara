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
import { HEADER_TABLE_IMAGES } from '@/constants/images-constant';
import DialogCreateImages from './dialog-create-image';
import DialogUpdateImages from './dialog-update-image';
import DialogDeleteImages from './dialog-delete-image';
import { CategorySelectItem, getCategoriesForSelect } from '../actions';
import type { Images } from '@/validations/image-validation';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Images() {
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
        data: images,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['images', currentPage, currentLimit, currentSearch],
        queryFn: async () => {
            const query = supabase
                .from('images')
                .select('*', { count: 'exact' })
                .range((currentPage - 1) * currentLimit, currentPage * currentLimit - 1)
                .order('created_at', { ascending: false });

            if (currentSearch) {
                query.or(`name.ilike.%${currentSearch}%`);
            }

            const result = await query;

            if (result.error)
                toast.error('Get Images data failed', {
                    description: result.error.message,
                });

            return result;
        },
    });

    const { data: categoryList = [], isLoading: isLoadingImagesList } = useQuery<CategorySelectItem[]>({
        queryKey: ['categoriesForSelect'],
        queryFn: getCategoriesForSelect,
    });

    const [selectedAction, setSelectedAction] = useState<{
        data: Images;
        type: 'update' | 'delete';
    } | null>(null);

    const handleChangeAction = (open: boolean) => {
        if (!open) setSelectedAction(null);
    };

    const filteredData = useMemo(() => {
        return (images?.data || []).map((images: Images, index) => {
            const uniqueKey = `${images.id}-${index}`;

            const categoryName = categoryList.find((c) => c.value === images.category_id)?.label || images.category_id;

            return [
                currentLimit * (currentPage - 1) + index + 1,
                <div key={`avatar-${uniqueKey}`} className="flex items-center gap-2">
                    <Avatar className="h-10 w-10 rounded">
                        <AvatarImage
                            src={images.image_url || ""}
                            alt={images.title}
                            className="object-cover"
                        />
                        <AvatarFallback className="rounded bg-muted">
                            <ImageIcon className="h-4 w-4 text-muted-foreground" />
                        </AvatarFallback>
                    </Avatar>
                </div>,
                <div key={`title-${uniqueKey}`} className="flex items-center gap-2">
                    {images.title}
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
                                    data: images,
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
                                    data: images,
                                    type: 'delete',
                                });
                            },
                        },
                    ]}
                />,
            ];
        });
    }, [images, currentPage, currentLimit, categoryList]);

    const totalPages = useMemo(() => {
        return images && images.count !== null
            ? Math.ceil(images.count / currentLimit)
            : 0;
    }, [images, currentLimit]);

    return (
        <div className="w-full">
            <div className="flex flex-col lg:flex-row mb-4 gap-2 justify-between w-full">
                <h1 className="text-2xl font-bold">Images Management</h1>
                <div className="flex gap-2">
                    <Input
                        placeholder="Search..."
                        onChange={(e) => handleChangeSearch(e.target.value)}
                    />
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" disabled={isLoadingImagesList}>
                                {isLoadingImagesList ? 'Loading...' : 'Create'}
                            </Button>
                        </DialogTrigger>

                        <DialogCreateImages
                            refetch={refetch}
                            categoryList={categoryList}
                        />
                    </Dialog>
                </div>
            </div>

            <DataTable
                header={HEADER_TABLE_IMAGES}
                data={filteredData}
                isLoading={isLoading}
                totalPages={totalPages}
                currentPage={currentPage}
                currentLimit={currentLimit}
                onChangePage={handleChangePage}
                onChangeLimit={handleChangeLimit}
            />

            {selectedAction?.type === 'update' && (
                <DialogUpdateImages
                    open={true}
                    refetch={refetch}
                    currentData={selectedAction.data}
                    handleChangeAction={handleChangeAction}
                    categoryList={categoryList}
                />
            )}

            {selectedAction?.type === 'delete' && (
                <DialogDeleteImages
                    open={true}
                    refetch={refetch}
                    currentData={selectedAction.data}
                    handleChangeAction={handleChangeAction}
                />
            )}
        </div>
    );
}