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
import { HEADER_TABLE_CONTENT, statusLabels, statusStyles } from '@/constants/content-constant';
import DialogCreateContent from './dialog-create-content';
import DialogUpdateContent from './dialog-update-content';
import DialogDeleteContent from './dialog-delete-content';
import { CategorySelectItem, getCategoriesForSelect } from '../actions';
import type { Content } from '@/validations/content-validation';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from '@/lib/utils';

export default function Content() {
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
        data: content,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['content', currentPage, currentLimit, currentSearch],
        queryFn: async () => {
            const query = supabase
                .from('content')
                .select('*', { count: 'exact' })
                .range((currentPage - 1) * currentLimit, currentPage * currentLimit - 1)
                .order('created_at', { ascending: false });

            if (currentSearch) {
                query.or(`title.ilike.%${currentSearch}%`);
            }

            const result = await query;

            if (result.error)
                toast.error('Get Content data failed', {
                    description: result.error.message,
                });

            return result;
        },
    });

    const { data: categoryList = [], isLoading: isLoadingContentList } = useQuery<CategorySelectItem[]>({
        queryKey: ['categoriesForSelect'],
        queryFn: getCategoriesForSelect,
    });

    const [selectedAction, setSelectedAction] = useState<{
        data: Content;
        type: 'update' | 'delete';
    } | null>(null);

    const handleChangeAction = (open: boolean) => {
        if (!open) setSelectedAction(null);
    };

    const filteredData = useMemo(() => {
        return (content?.data || []).map((content: Content, index) => {
            const uniqueKey = `${content.id}-${index}`;

            const categoryName = categoryList.find((c) => c.value === content.category_id)?.label || content.category_id;

            return [
                currentLimit * (currentPage - 1) + index + 1,
                <div key={`avatar-${uniqueKey}`} className="flex items-center gap-2">
                    <Avatar className="h-10 w-10 rounded">
                        <AvatarImage
                            src={content.featured_image_url || ""}
                            alt={content.title}
                            className="object-cover"
                        />
                        <AvatarFallback className="rounded bg-muted">
                            <ImageIcon className="h-4 w-4 text-muted-foreground" />
                        </AvatarFallback>
                    </Avatar>
                </div>,
                <div key={`title-${uniqueKey}`} className="flex items-center gap-2">
                    {content.title}
                </div>,
                <span key={`category-${uniqueKey}`}>{categoryName}</span>,
                <div
                    key={`status-${uniqueKey}`}
                    className={cn(
                        'px-2 py-1 rounded-full text-white text-xs font-medium w-fit',
                        statusStyles[content.publish_status] || 'bg-gray-500'
                    )}
                >
                    {statusLabels[content.publish_status] || content.publish_status}
                </div>,
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
                                    data: content,
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
                                    data: content,
                                    type: 'delete',
                                });
                            },
                        },
                    ]}
                />,
            ];
        });
    }, [content, currentPage, currentLimit, categoryList]);

    const totalPages = useMemo(() => {
        return content && content.count !== null
            ? Math.ceil(content.count / currentLimit)
            : 0;
    }, [content, currentLimit]);

    return (
        <div className="w-full">
            <div className="flex flex-col lg:flex-row mb-4 gap-2 justify-between w-full">
                <h1 className="text-2xl font-bold">Content Management</h1>
                <div className="flex gap-2">
                    <Input
                        placeholder="Search..."
                        onChange={(e) => handleChangeSearch(e.target.value)}
                    />
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" disabled={isLoadingContentList}>
                                {isLoadingContentList ? 'Loading...' : 'Create'}
                            </Button>
                        </DialogTrigger>

                        <DialogCreateContent
                            refetch={refetch}
                            categoryList={categoryList}
                        />
                    </Dialog>
                </div>
            </div>

            <DataTable
                header={HEADER_TABLE_CONTENT}
                data={filteredData}
                isLoading={isLoading}
                totalPages={totalPages}
                currentPage={currentPage}
                currentLimit={currentLimit}
                onChangePage={handleChangePage}
                onChangeLimit={handleChangeLimit}
            />

            {selectedAction?.type === 'update' && (
                <DialogUpdateContent
                    open={true}
                    refetch={refetch}
                    currentData={selectedAction.data}
                    handleChangeAction={handleChangeAction}
                    categoryList={categoryList}
                />
            )}

            {selectedAction?.type === 'delete' && (
                <DialogDeleteContent
                    open={true}
                    refetch={refetch}
                    currentData={selectedAction.data}
                    handleChangeAction={handleChangeAction}
                />
            )}
        </div>
    );
}