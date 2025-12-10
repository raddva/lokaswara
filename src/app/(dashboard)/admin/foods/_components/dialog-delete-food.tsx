/* eslint-disable react-hooks/exhaustive-deps */
import DialogDelete from '@/components/common/dialog-delete';
import { startTransition, useActionState, useEffect } from 'react';
import { deleteFoods } from '../actions';
import { INITIAL_STATE_ACTION } from '@/constants/general-constant';
import { toast } from 'sonner';
import { Foods } from '@/validations/foods-validation';

export default function DialogDeleteFoods({
    open,
    refetch,
    currentData,
    handleChangeAction,
}: {
    refetch: () => void;
    currentData?: Foods;
    open: boolean;
    handleChangeAction: (open: boolean) => void;
}) {
    const [deleteFoodsState, deleteFoodsAction, isPendingDeleteFoods] =
        useActionState(deleteFoods, INITIAL_STATE_ACTION);

    const onSubmit = () => {
        const formData = new FormData();
        formData.append('id', currentData!.id as string);
        formData.append('image_url', currentData!.image_url as string);

        startTransition(() => {
            deleteFoodsAction(formData);
        });
    };

    useEffect(() => {
        if (deleteFoodsState?.status === 'error') {
            toast.error('Delete Foods Failed', {
                description: deleteFoodsState.errors?._form?.[0],
            });
        }

        if (deleteFoodsState?.status === 'success') {
            toast.success('Delete Foods Success');
            handleChangeAction?.(false);
            refetch();
        }
    }, [deleteFoodsState]);

    return (
        <DialogDelete
            open={open}
            onOpenChange={handleChangeAction}
            isLoading={isPendingDeleteFoods}
            onSubmit={onSubmit}
            title="Foods"
        />
    );
}