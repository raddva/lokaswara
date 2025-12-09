import FormInput from '@/components/common/form-input';
import FormSelect from '@/components/common/form-select';
import { Button } from '@/components/ui/button';
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { LanguageSelectItem, ContentSelectItem } from '../actions';
import { FormEvent } from 'react';
import { VideosForm } from '@/validations/videos-validation';
import { PUBLISH_STATUS_LIST } from '@/constants/content-constant';

export default function FormVideos({
    form,
    onSubmit,
    isLoading,
    type,
    languageList,
    contentList,
}: {
    form: UseFormReturn<VideosForm>;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    isLoading: boolean;
    type: 'Create' | 'Update';
    languageList: LanguageSelectItem[];
    contentList: ContentSelectItem[];
}) {
    return (
        <DialogContent className="sm:max-w-[425px] max-h-[90vh]">
            <Form {...form}>
                <DialogHeader>
                    <DialogTitle>{type} Videos</DialogTitle>
                    <DialogDescription>
                        {type === 'Create' ? 'Add a new videos' : 'Make changes videos here'}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="space-y-4 max-h-[50vh] px-1 overflow-y-auto">
                        <FormInput
                            form={form}
                            name="title"
                            label="Title"
                            placeholder="Insert title here"
                        />
                        <FormInput
                            form={form}
                            name="description"
                            label="Description"
                            placeholder="Insert description here"
                            type="textarea"
                        />
                        <FormInput
                            form={form}
                            name="youtube_url"
                            label="URL Youtube"
                            placeholder="Insert youtube url here"
                        />
                        <FormSelect
                            form={form}
                            name="language_id"
                            label="Language"
                            placeholder="Select a language"
                            selectItem={languageList}
                        />
                        <FormSelect
                            form={form}
                            name="content_id"
                            label="Content"
                            placeholder="Select a content"
                            selectItem={contentList}
                        />
                        <FormSelect
                            form={form}
                            name="publish_status"
                            label="Availability"
                            selectItem={PUBLISH_STATUS_LIST}
                        />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">
                            {isLoading ? <Loader2 className="animate-spin" /> : type}
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    );
}