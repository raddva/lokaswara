/* eslint-disable react-hooks/exhaustive-deps */
import DialogDelete from '@/components/common/dialog-delete';
import { startTransition, useActionState, useEffect } from 'react';
import { deleteImages } from '../actions';
import { INITIAL_STATE_ACTION } from '@/constants/general-constant';
import { toast } from 'sonner';
import { Images } from '@/validations/image-validation';

export default function DialogDeleteImages({
    open,
    refetch,
    currentData,
    handleChangeAction,
}: {
    refetch: () => void;
    currentData?: Images;
    open: boolean;
    handleChangeAction: (open: boolean) => void;
}) {
    const [deleteImagesState, deleteImagesAction, isPendingDeleteImages] =
        useActionState(deleteImages, INITIAL_STATE_ACTION);

    const onSubmit = () => {
        const formData = new FormData();
        formData.append('id', currentData!.id as string);
        startTransition(() => {
            deleteImagesAction(formData);
        });
    };

    useEffect(() => {
        if (deleteImagesState?.status === 'error') {
            toast.error('Delete Image Failed', {
                description: deleteImagesState.errors?._form?.[0],
            });
        }

        if (deleteImagesState?.status === 'success') {
            toast.success('Delete Image Success');
            handleChangeAction?.(false);
            refetch();
        }
    }, [deleteImagesState]);

    return (
        <DialogDelete
            open={open}
            onOpenChange={handleChangeAction}
            isLoading={isPendingDeleteImages}
            onSubmit={onSubmit}
            title="Image"
        />
    );
}