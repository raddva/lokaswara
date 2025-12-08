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
import { FoodsForm } from '@/validations/foods-validation';

export default function FormFoods({
    form,
    onSubmit,
    isLoading,
    type,
    categoryList,
    preview,
    setPreview,
}: {
    form: UseFormReturn<FoodsForm>;
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
                    <DialogTitle>{type} Foods</DialogTitle>
                    <DialogDescription>
                        {type === 'Create' ? 'Add a new foods' : 'Make changes foods here'}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="space-y-4 max-h-[50vh] px-1 overflow-y-auto">
                        <FormInput
                            form={form}
                            name="name"
                            label="Name"
                            placeholder="Insert name here"
                        />
                        <FormInput
                            form={form}
                            name="ingredients"
                            label="Ingredients"
                            placeholder="Insert ingredients here"
                            type="textarea"
                        />
                        <FormInput
                            form={form}
                            name="tutorial"
                            label="Tutorial"
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
                            name="image_url"
                            label="Image"
                            preview={preview}
                            setPreview={setPreview}
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