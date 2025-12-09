/* eslint-disable react-hooks/set-state-in-effect */
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { ScrollText, Mail, Text, Zap, Calendar, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContentRequestData } from '@/types/content-request';
import { format } from 'date-fns';
import { useActionState, useEffect, startTransition, useState } from 'react';
import { INITIAL_STATE_ACTION } from '@/constants/general-constant';
import { toast } from 'sonner';
import { useAuthStore } from '@/stores/auth-store';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { updateContentRequestStatus } from '../actions';

interface DialogDetailContentRequestProps {
    request: ContentRequestData;
    onSuccess: () => void;
}

const STATUS_OPTIONS = [
    { value: 'waiting', label: 'Waiting', color: 'bg-amber-500' },
    { value: 'accepted', label: 'Accepted', color: 'bg-sky-600' },
    { value: 'rejected', label: 'Rejected', color: 'bg-red-600' },
];

export function DialogDetailContentRequest({
    request,
    onSuccess,
}: DialogDetailContentRequestProps) {
    const user = useAuthStore((state) => state.user);

    const [updateState, updateAction] = useActionState(
        updateContentRequestStatus,
        INITIAL_STATE_ACTION,
    );
    const [toastShown, setToastShown] = useState(false);

    useEffect(() => {
        if (updateState?.status === 'error') {
            toast.error('Update Status Failed', {
                description: updateState.errors?._form?.[0],
            });
            setToastShown(false);
        }

        if (updateState?.status === 'success' && !toastShown) {
            toast.success('Status Updated Successfully');
            setToastShown(true);
            onSuccess();
        }
    }, [updateState, onSuccess, toastShown]);

    useEffect(() => {
        setToastShown(false);
    }, [request.id]);


    const handleUpdateStatus = (newStatus: string) => {
        setToastShown(false);

        const formData = new FormData();
        formData.append('id', request.id);
        formData.append('status', newStatus);
        if (user?.id) {
            formData.append('reviewer_id', user.id);
        }

        startTransition(() => {
            updateAction(formData);
        });
    };

    const currentStatusOption = STATUS_OPTIONS.find(
        (opt) => opt.value === request.status,
    );

    return (
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                    <ScrollText />
                    Content Request Detail
                </DialogTitle>
                <DialogDescription>
                    Review and update the status of the request from{' '}
                    **{request.user_email}**.
                </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
                <div className="flex items-center gap-4">
                    <div className="w-1/4 font-medium flex items-center gap-2">
                        <Zap className="size-4 text-primary" /> Type
                    </div>
                    <div className="w-3/4">{request.content_type}</div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="w-1/4 font-medium flex items-center gap-2">
                        <Text className="size-4 text-primary" /> Subject
                    </div>
                    <div className="w-3/4">{request.subject}</div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="w-1/4 font-medium flex items-center gap-2">
                        <Mail className="size-4 text-primary" /> User Email
                    </div>
                    <div className="w-3/4">{request.user_email}</div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="w-1/4 font-medium flex items-center gap-2">
                        <Calendar className="size-4 text-primary" /> Date
                    </div>
                    <div className="w-3/4">
                        {format(
                            new Date(request.request_date),
                            'dd MMM yyyy HH:mm:ss',
                        )}
                    </div>
                </div>

                <div className="grid gap-2 mt-4">
                    <p className="font-medium flex items-center gap-2 text-primary">
                        <ScrollText className="size-4" /> Request Body
                    </p>
                    <div className="p-3 border rounded-md whitespace-pre-wrap bg-gray-50 dark:bg-gray-800">
                        {request.body}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 pt-4 border-t mt-4">
                    <div className="w-full md:w-1/4 font-bold flex items-center gap-2">
                        <UserCheck className="size-4 text-green-600" /> Status
                        <div
                            className={cn(
                                'px-2 py-0.5 rounded-full text-white capitalize text-xs',
                                currentStatusOption?.color,
                            )}
                        >
                            {request.status}
                        </div>
                    </div>

                    <div className="w-full md:w-3/4 flex gap-2">
                        <Select
                            onValueChange={handleUpdateStatus}
                            value={request.status}
                            disabled={updateState.status === 'pending'}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Update Status" />
                            </SelectTrigger>
                            <SelectContent>
                                {STATUS_OPTIONS.map((option) => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button
                            onClick={() => {
                                handleUpdateStatus(request.status);
                            }}
                            type="button"
                            disabled={updateState.status === 'pending'}
                        >
                            {updateState.status === 'pending'
                                ? 'Updating...'
                                : 'Save Status'}
                        </Button>
                    </div>
                </div>
            </div>
        </DialogContent>
    );
}