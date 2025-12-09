/* eslint-disable react-hooks/exhaustive-deps */
import DialogDelete from '@/components/common/dialog-delete';
import { startTransition, useActionState, useEffect } from 'react';
import { deleteContent } from '../actions';
import { INITIAL_STATE_ACTION } from '@/constants/general-constant';
import { toast } from 'sonner';
import { Content } from '@/validations/content-validation';

export default function DialogDeleteContent({
    open,
    refetch,
    currentData,
    handleChangeAction,
}: {
    refetch: () => void;
    currentData?: Content;
    open: boolean;
    handleChangeAction: (open: boolean) => void;
}) {
    const [deleteContentState, deleteContentAction, isPendingDeleteContent] =
        useActionState(deleteContent, INITIAL_STATE_ACTION);

    const onSubmit = () => {
        const formData = new FormData();
        formData.append('id', currentData!.id as string);
        formData.append('image_url', currentData!.featured_image_url as string);
        startTransition(() => {
            deleteContentAction(formData);
        });
    };

    useEffect(() => {
        if (deleteContentState?.status === 'error') {
            toast.error('Delete Content Failed', {
                description: deleteContentState.errors?._form?.[0],
            });
        }

        if (deleteContentState?.status === 'success') {
            toast.success('Delete Content Success');
            handleChangeAction?.(false);
            refetch();
        }
    }, [deleteContentState]);

    return (
        <DialogDelete
            open={open}
            onOpenChange={handleChangeAction}
            isLoading={isPendingDeleteContent}
            onSubmit={onSubmit}
            title="Content"
        />
    );
}