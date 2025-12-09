/* eslint-disable react-hooks/exhaustive-deps */
import DialogDelete from '@/components/common/dialog-delete';
import { startTransition, useActionState, useEffect } from 'react';
import { deleteDictionary } from '../actions';
import { INITIAL_STATE_ACTION } from '@/constants/general-constant';
import { toast } from 'sonner';
import { Dictionary } from '@/validations/dictionary-validation';

export default function DialogDeleteDictionary({
    open,
    refetch,
    currentData,
    handleChangeAction,
}: {
    refetch: () => void;
    currentData?: Dictionary;
    open: boolean;
    handleChangeAction: (open: boolean) => void;
}) {
    const [deleteDictionaryState, deleteDictionaryAction, isPendingDeleteDictionary] =
        useActionState(deleteDictionary, INITIAL_STATE_ACTION);

    const onSubmit = () => {
        const formData = new FormData();
        formData.append('id', currentData!.id as string);
        startTransition(() => {
            deleteDictionaryAction(formData);
        });
    };

    useEffect(() => {
        if (deleteDictionaryState?.status === 'error') {
            toast.error('Delete Dictionary Failed', {
                description: deleteDictionaryState.errors?._form?.[0],
            });
        }

        if (deleteDictionaryState?.status === 'success') {
            toast.success('Delete Dictionary Success');
            handleChangeAction?.(false);
            refetch();
        }
    }, [deleteDictionaryState]);

    return (
        <DialogDelete
            open={open}
            onOpenChange={handleChangeAction}
            isLoading={isPendingDeleteDictionary}
            onSubmit={onSubmit}
            title="Dictionary"
        />
    );
}