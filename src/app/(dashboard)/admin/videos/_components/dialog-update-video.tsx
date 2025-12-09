/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { updateVideos, LanguageSelectItem, ContentSelectItem } from '../actions';
import { toast } from 'sonner';
import FormVideos from './form-videos';
import { Dialog } from '@/components/ui/dialog';
import { Videos, videosFormSchema } from '@/validations/videos-validation';
import { INITIAL_STATE_VIDEOS } from '@/constants/videos-constant';
import { z } from 'zod';


type UpdateVideosFormValues = z.infer<typeof videosFormSchema>;

export default function DialogUpdateVideos({
    refetch,
    currentData,
    open,
    handleChangeAction,
    languageList,
    contentList,
}: {
    refetch: () => void;
    currentData?: Videos;
    open?: boolean;
    handleChangeAction?: (open: boolean) => void;
    languageList: LanguageSelectItem[];
    contentList: ContentSelectItem[];
}) {

    const form = useForm<UpdateVideosFormValues>({
        resolver: zodResolver(videosFormSchema),
        defaultValues: {
            title: '',
            description: '',
            youtube_url: '',
            language_id: '',
            content_id: '',
            publish_status: 'draft',
        },
    });

    const [updateVideosState, updateVideosAction, isPendingUpdateVideos] =
        useActionState(updateVideos, INITIAL_STATE_VIDEOS);

    useEffect(() => {
        if (currentData) {
            form.reset({
                title: currentData.title,
                description: currentData.description || '',
                youtube_url: currentData.youtube_url || '',
                language_id: currentData.language_id || '',
                content_id: currentData.content_id || '',
                publish_status: currentData.publish_status || '',
            });
        }
    }, [currentData, form]);

    useEffect(() => {
        if (!updateVideosState || updateVideosState === INITIAL_STATE_VIDEOS) return;

        if (updateVideosState.status === 'error') {
            const errors = updateVideosState.errors;
            const formErrors = errors?._form;

            if (formErrors && formErrors.length > 0) {
                toast.error('Update Videos Failed', { description: formErrors[0] });
            }
            if (errors) {
                Object.keys(errors).forEach(key => {
                    const fieldName = key as keyof UpdateVideosFormValues;
                    if (errors[fieldName as keyof typeof errors]) {
                        form.setError(fieldName, {
                            type: 'server',
                            message: errors[fieldName as keyof typeof errors]?.[0] || 'Server error',
                        });
                    }
                });
            }
        }

        if (updateVideosState.status === 'success') {
            toast.success('Update Videos Success');
            handleChangeAction?.(false);
            refetch();
        }
    }, [updateVideosState, handleChangeAction, refetch, form]);

    const onSubmit = form.handleSubmit((data) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('youtube_url', data.youtube_url);
        formData.append('language_id', data.language_id);
        formData.append('content_id', data.content_id);
        formData.append('publish_status', data.publish_status);
        formData.append('id', currentData?.id ?? '');

        startTransition(() => {
            updateVideosAction(formData);
        });
    });

    return (
        <Dialog open={open} onOpenChange={handleChangeAction}>
            <FormVideos
                form={form as any}
                onSubmit={onSubmit}
                isLoading={isPendingUpdateVideos}
                type="Update"
                languageList={languageList}
                contentList={contentList}
            />
        </Dialog>
    );
}