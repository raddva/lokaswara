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
import { HEADER_TABLE_VIDEOS } from '@/constants/videos-constant';
import DialogCreateVideos from './dialog-create-video';
import DialogUpdateVideos from './dialog-update-video';
import DialogDeleteVideos from './dialog-delete-video';
import { ContentSelectItem, LanguageSelectItem, getContents, getLanguages } from '../actions';
import type { Videos } from '@/validations/videos-validation';
import { statusLabels, statusStyles } from '@/constants/content-constant';
import { cn } from '@/lib/utils';

export default function Videos() {
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
        data: videos,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['videos', currentPage, currentLimit, currentSearch],
        queryFn: async () => {
            const query = supabase
                .from('videos')
                .select('*', { count: 'exact' })
                .range((currentPage - 1) * currentLimit, currentPage * currentLimit - 1)
                .order('created_at', { ascending: false });

            if (currentSearch) {
                query.or(`title.ilike.%${currentSearch}%`);
            }

            const result = await query;

            if (result.error)
                toast.error('Get Videos data failed', {
                    description: result.error.message,
                });

            return result;
        },
    });

    const { data: languageList = [], isLoading: isLoadingLanguageList } = useQuery<LanguageSelectItem[]>({
        queryKey: ['languagesForSelect'],
        queryFn: getLanguages,
    });

    const { data: contentList = [], isLoading: isLoadingContentList } = useQuery<ContentSelectItem[]>({
        queryKey: ['contentForSelect'],
        queryFn: getContents,
    });

    const [selectedAction, setSelectedAction] = useState<{
        data: Videos;
        type: 'update' | 'delete';
    } | null>(null);

    const handleChangeAction = (open: boolean) => {
        if (!open) setSelectedAction(null);
    };

    const filteredData = useMemo(() => {
        return (videos?.data || []).map((videos: Videos, index) => {
            const uniqueKey = `${videos.id}-${index}`;

            const languageName = languageList.find((c) => c.value === videos.language_id)?.label || videos.language_id;
            const contentName = contentList.find((c) => c.value === videos.content_id)?.label || videos.content_id;

            return [
                currentLimit * (currentPage - 1) + index + 1,
                <div key={`title-${uniqueKey}`} className="flex items-center gap-2">
                    {videos.title}
                </div>,
                <span key={`language-${uniqueKey}`}>{languageName}</span>,
                <span key={`content-${uniqueKey}`}>{contentName}</span>,
                <div
                    key={`status-${uniqueKey}`}
                    className={cn(
                        'px-2 py-1 rounded-full text-white text-xs font-medium w-fit',
                        statusStyles[videos.publish_status] || 'bg-gray-500'
                    )}
                >
                    {statusLabels[videos.publish_status] || videos.publish_status}
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
                                    data: videos,
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
                                    data: videos,
                                    type: 'delete',
                                });
                            },
                        },
                    ]}
                />,
            ];
        });
    }, [videos, currentPage, currentLimit, languageList, contentList]);

    const totalPages = useMemo(() => {
        return videos && videos.count !== null
            ? Math.ceil(videos.count / currentLimit)
            : 0;
    }, [videos, currentLimit]);

    return (
        <div className="w-full">
            <div className="flex flex-col lg:flex-row mb-4 gap-2 justify-between w-full">
                <h1 className="text-2xl font-bold">Videos Management</h1>
                <div className="flex gap-2">
                    <Input
                        placeholder="Search..."
                        onChange={(e) => handleChangeSearch(e.target.value)}
                    />
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" disabled={isLoadingLanguageList || isLoadingContentList}>
                                {isLoadingLanguageList || isLoadingContentList ? 'Loading...' : 'Create'}
                            </Button>
                        </DialogTrigger>

                        <DialogCreateVideos
                            refetch={refetch}
                            languageList={languageList}
                            contentList={contentList}
                        />
                    </Dialog>
                </div>
            </div>

            <DataTable
                header={HEADER_TABLE_VIDEOS}
                data={filteredData}
                isLoading={isLoading}
                totalPages={totalPages}
                currentPage={currentPage}
                currentLimit={currentLimit}
                onChangePage={handleChangePage}
                onChangeLimit={handleChangeLimit}
            />

            {selectedAction?.type === 'update' && (
                <DialogUpdateVideos
                    open={true}
                    refetch={refetch}
                    currentData={selectedAction.data}
                    handleChangeAction={handleChangeAction}
                    languageList={languageList}
                    contentList={contentList}
                />
            )}

            {selectedAction?.type === 'delete' && (
                <DialogDeleteVideos
                    open={true}
                    refetch={refetch}
                    currentData={selectedAction.data}
                    handleChangeAction={handleChangeAction}
                />
            )}
        </div>
    );
}