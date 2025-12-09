/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createVideos } from '../actions';
import { toast } from 'sonner';
import { videosFormSchema } from '@/validations/videos-validation';
import { INITIAL_VIDEOS, INITIAL_STATE_VIDEOS } from '@/constants/videos-constant';
import FormVideos from './form-videos';
import { LanguageSelectItem, ContentSelectItem } from '../actions';
import { z } from 'zod';

type CreateVideosFormValues = z.infer<typeof videosFormSchema>;

export default function DialogCreateVideos({
    refetch,
    languageList,
    contentList,
}: {
    refetch: () => void;
    languageList: LanguageSelectItem[]
    contentList: ContentSelectItem[]
}) {
    const form = useForm<CreateVideosFormValues>({
        resolver: zodResolver(videosFormSchema),
        defaultValues: INITIAL_VIDEOS,
    });

    const [createVideosState, createVideosAction, isPendingCreateVideos] =
        useActionState(createVideos, INITIAL_STATE_VIDEOS);


    const onSubmit = form.handleSubmit((data) => {
        const formData = new FormData();

        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('youtube_url', data.youtube_url);
        formData.append('language_id', data.language_id);
        formData.append('content_id', data.content_id);
        formData.append('publish_status', data.publish_status);

        startTransition(() => {
            createVideosAction(formData);
        });
    });

    useEffect(() => {
        if (createVideosState?.status === 'error') {
            console.error("Server Error:", createVideosState.errors);

            const formErrors = createVideosState.errors?._form;
            if (formErrors && formErrors.length > 0) {
                toast.error('Create Videos Failed', {
                    description: formErrors[0],
                });
            } else {
                const errors = createVideosState.errors;
                if (errors) {
                    Object.keys(errors).forEach((key) => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        const msg = errors[key]?.[0];
                        if (msg) toast.error(`Error in ${key}: ${msg}`);
                    })
                }
            }
        }

        if (createVideosState?.status === 'success') {
            toast.success('Create Videos Success');
            form.reset();

            document.querySelector<HTMLButtonElement>('[data-state="open"]')?.click();
            refetch();
        }
    }, [createVideosState, form, refetch]);

    return (
        <FormVideos
            form={form as any}
            onSubmit={onSubmit}
            isLoading={isPendingCreateVideos}
            type="Create"
            languageList={languageList}
            contentList={contentList}
        />
    );
}