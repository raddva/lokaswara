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
import { LanguageSelectItem } from '../actions';
import { FormEvent } from 'react';
import { Preview } from '@/types/general';
import { DictionaryForm } from '@/validations/dictionary-validation';

export default function FormDictionary({
    form,
    onSubmit,
    isLoading,
    type,
    languageList,
}: {
    form: UseFormReturn<DictionaryForm>;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    isLoading: boolean;
    type: 'Create' | 'Update';
    languageList: LanguageSelectItem[];
    preview?: Preview;
    setPreview?: (preview: Preview) => void;
}) {
    return (
        <DialogContent className="sm:max-w-[425px] max-h-[90vh]">
            <Form {...form}>
                <DialogHeader>
                    <DialogTitle>{type} Dictionary</DialogTitle>
                    <DialogDescription>
                        {type === 'Create' ? 'Add a new dictionary' : 'Make changes dictionary here'}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="space-y-4 max-h-[50vh] px-1 overflow-y-auto">
                        <FormInput
                            form={form}
                            name="word"
                            label="Word"
                            placeholder="Insert word here"
                        />
                        <FormInput
                            form={form}
                            name="meaning"
                            label="Meaning"
                            placeholder="Insert meaning here"
                        />
                        <FormInput
                            form={form}
                            name="synonym"
                            label="Synonym"
                            placeholder="Insert synonym here"
                        />
                        <FormInput
                            form={form}
                            name="pronunciation"
                            label="Pronunciation"
                            placeholder="Insert pronunciation here"
                        />
                        <FormSelect
                            form={form}
                            name="language_id"
                            label="Language"
                            placeholder="Select a language"
                            selectItem={languageList}
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