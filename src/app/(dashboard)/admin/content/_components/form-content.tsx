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
import { CategorySelectItem } from '../actions';
import { FormEvent } from 'react';
import FormImage from '@/components/common/form-image';
import { Preview } from '@/types/general';
import { PUBLISH_STATUS_LIST } from '@/constants/content-constant';
import { ContentForm } from '@/validations/content-validation';

export default function FormContent({
    form,
    onSubmit,
    isLoading,
    type,
    categoryList,
    preview,
    setPreview,
}: {
    form: UseFormReturn<ContentForm>;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    isLoading: boolean;
    type: 'Create' | 'Update';
    categoryList: CategorySelectItem[];
    preview?: Preview;
    setPreview?: (preview: Preview) => void;
}) {
    return (
        <DialogContent className="sm:max-w-[425px] max-h-[90vh]">
            <Form {...form}>
                <DialogHeader>
                    <DialogTitle>{type} Content</DialogTitle>
                    <DialogDescription>
                        {type === 'Create' ? 'Add a new content' : 'Make changes content here'}
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
                            name="slug"
                            label="Slug"
                            placeholder="Insert slug here"
                        />
                        <FormInput
                            form={form}
                            name="body"
                            label="Description"
                            placeholder="Insert description here"
                            type="textarea"
                        />
                        <FormSelect
                            form={form}
                            name="category_id"
                            label="Category"
                            placeholder="Select a category"
                            selectItem={categoryList}
                        />
                        <FormImage
                            form={form}
                            name="featured_image_url"
                            label="Image"
                            preview={preview}
                            setPreview={setPreview}
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