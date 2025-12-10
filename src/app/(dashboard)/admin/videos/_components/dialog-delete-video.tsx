/* eslint-disable react-hooks/exhaustive-deps */
import DialogDelete from '@/components/common/dialog-delete';
import { startTransition, useActionState, useEffect } from 'react';
import { deleteVideos } from '../actions';
import { INITIAL_STATE_ACTION } from '@/constants/general-constant';
import { toast } from 'sonner';
import { Videos } from '@/validations/videos-validation';

export default function DialogDeleteVideos({
    open,
    refetch,
    currentData,
    handleChangeAction,
}: {
    refetch: () => void;
    currentData?: Videos;
    open: boolean;
    handleChangeAction: (open: boolean) => void;
}) {
    const [deleteVideosState, deleteVideosAction, isPendingDeleteVideos] =
        useActionState(deleteVideos, INITIAL_STATE_ACTION);

    const onSubmit = () => {
        const formData = new FormData();
        formData.append('id', currentData!.id as string);
        startTransition(() => {
            deleteVideosAction(formData);
        });
    };

    useEffect(() => {
        if (deleteVideosState?.status === 'error') {
            toast.error('Delete Video Failed', {
                description: deleteVideosState.errors?._form?.[0],
            });
        }

        if (deleteVideosState?.status === 'success') {
            toast.success('Delete Video Success');
            handleChangeAction?.(false);
            refetch();
        }
    }, [deleteVideosState]);

    return (
        <DialogDelete
            open={open}
            onOpenChange={handleChangeAction}
            isLoading={isPendingDeleteVideos}
            onSubmit={onSubmit}
            title="Video"
        />
    );
}