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
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { CategorySelectItem } from '../actions';
import { FormEvent } from 'react';

export default function FormCategory<T extends FieldValues>({
    form,
    onSubmit,
    isLoading,
    type,
    categoryList,
}: {
    form: UseFormReturn<T>;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    isLoading: boolean;
    type: 'Create' | 'Update';
    categoryList: CategorySelectItem[];
}) {
    return (
        <DialogContent className="sm:max-w-[425px] max-h-[90vh]">
            <Form {...form}>
                <DialogHeader>
                    <DialogTitle>{type} Menu</DialogTitle>
                    <DialogDescription>
                        {type === 'Create' ? 'Add a new category' : 'Make changes category here'}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="space-y-4 max-h-[50vh] px-1 overflow-y-auto">
                        <FormInput
                            form={form}
                            name={'name' as Path<T>}
                            label="Name"
                            placeholder="Insert name here"
                        />
                        <FormInput
                            form={form}
                            name={'slug' as Path<T>}
                            label="Slug"
                            placeholder="Insert slug here"
                        />
                        <FormInput
                            form={form}
                            name={'description' as Path<T>}
                            label="Description"
                            placeholder="Insert description here"
                            type="textarea"
                        />
                        <FormSelect
                            form={form}
                            name={'parent_id' as Path<T>}
                            label="Parent Category (Optional)"
                            placeholder="Select a parent category"
                            selectItem={[
                                { value: 'null', label: '— No Parent (Top Level) —' },
                                ...categoryList.filter(c => c.value !== form.getValues()?.id)
                            ]}
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
