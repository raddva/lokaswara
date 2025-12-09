'use client';

import DataTable from '@/components/common/datatable';
import DropdownAction from '@/components/common/dropdown-action';
import { Dialog } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import useDataTable from '@/hooks/use-datatable';
import { createClientSupabase } from '@/lib/supabase/default';
import { useQuery } from '@tanstack/react-query';
import { ScrollText } from 'lucide-react';
import { useMemo, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { HEADER_TABLE_CONTENT_REQUEST } from '@/constants/content-request-constant';
import { format } from 'date-fns';
import { ContentRequestData } from '@/types/content-request';
import { DialogDetailContentRequest } from './dialog-detail-content-request';

export default function ContentRequestManagement() {
    const supabase = createClientSupabase();
    const {
        currentPage,
        currentLimit,
        currentSearch,
        handleChangePage,
        handleChangeLimit,
        handleChangeSearch,
    } = useDataTable();

    const [selectedRequest, setSelectedRequest] =
        useState<ContentRequestData | null>(null);
    const [openDetailDialog, setOpenDetailDialog] = useState(false);

    const {
        data: contentRequests,
        isLoading,
        refetch: refetchContentRequests,
    } = useQuery({
        queryKey: ['contentRequests', currentPage, currentLimit, currentSearch],
        queryFn: async () => {
            const query = supabase
                .from('content_requests')
                .select('*', { count: 'exact' })
                .range((currentPage - 1) * currentLimit, currentPage * currentLimit - 1)
                .order('request_date', { ascending: false });

            if (currentSearch) {
                query.or(
                    `subject.ilike.%${currentSearch}%,content_type.ilike.%${currentSearch}%,user_email.ilike.%${currentSearch}%`,
                );
            }

            const result = await query;
            console.log('Content Requests Result:', result);

            if (result.error)
                toast.error('Get Content Requests failed', {
                    description: result.error.message,
                });

            return result;
        },
    });

    const totalPages = useMemo(() => {
        return contentRequests && contentRequests.count !== null
            ? Math.ceil(contentRequests.count / currentLimit)
            : 0;
    }, [contentRequests, currentLimit]);

    useEffect(() => {
        if (contentRequests?.count !== undefined && contentRequests.count !== null) {
            const totalCount = contentRequests.count;
            const calculatedTotalPages = Math.ceil(totalCount / currentLimit);

            if (calculatedTotalPages > 0 && currentPage > calculatedTotalPages) {
                handleChangePage(1);
            }
        }
    }, [contentRequests, currentLimit, currentPage, handleChangePage]);


    const handleViewDetail = (request: ContentRequestData) => {
        setSelectedRequest(request);
        setOpenDetailDialog(true);
    };

    const filteredData = useMemo(() => {
        return (contentRequests?.data || []).map((request, index) => {
            const contentRequest = request as unknown as ContentRequestData;

            return [
                currentLimit * (currentPage - 1) + index + 1,
                contentRequest.content_type,
                contentRequest.subject,
                format(new Date(contentRequest.request_date), 'dd MMM yyyy HH:mm'),
                <div
                    className={cn(
                        'px-2 py-1 rounded-full text-white w-fit capitalize text-xs',
                        {
                            'bg-amber-500': contentRequest.status === 'waiting',
                            'bg-sky-600': contentRequest.status === 'accepted',
                            'bg-red-600': contentRequest.status === 'rejected',
                        },
                    )}
                    key={`status-${contentRequest.id}`}
                >
                    {contentRequest.status}
                </div>,
                <DropdownAction
                    key={`actions-${contentRequest.id}`}
                    menu={[
                        {
                            label: (
                                <span className="flex items-center gap-2">
                                    <ScrollText />
                                    View Detail
                                </span>
                            ),
                            action: () => handleViewDetail(contentRequest),
                        },
                    ]}
                />,
            ];
        });
    }, [contentRequests, currentLimit, currentPage]);

    return (
        <div className="w-full">
            <div className="flex gap-2 justify-between mb-4">
                <Input
                    placeholder="Search by subject, type, or user email..."
                    className="max-w-96"
                    onChange={(e) => handleChangeSearch(e.target.value)}
                />
            </div>

            <Dialog open={openDetailDialog} onOpenChange={setOpenDetailDialog}>
                {selectedRequest && (
                    <DialogDetailContentRequest
                        request={selectedRequest}
                        onSuccess={() => {
                            refetchContentRequests();
                            setOpenDetailDialog(false);
                            setSelectedRequest(null);
                        }}
                    />
                )}
            </Dialog>

            <DataTable
                header={HEADER_TABLE_CONTENT_REQUEST}
                data={filteredData}
                isLoading={isLoading}
                totalPages={totalPages}
                currentPage={currentPage}
                currentLimit={currentLimit}
                onChangePage={handleChangePage}
                onChangeLimit={handleChangeLimit}
            />
        </div>
    );
}