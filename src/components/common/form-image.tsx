import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { FileImage } from 'lucide-react';
import { getImageData } from '@/lib/utils';
import { Preview } from '@/types/general';

export default function FormImage<T extends FieldValues>({
    form,
    name,
    label,
    preview,
    setPreview,
}: {
    form: UseFormReturn<T>;
    name: Path<T>;
    label: string;
    preview?: Preview;
    setPreview?: (preview: Preview) => void;
}) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => {
                const { onChange, value, ...rest } = field;

                return (
                    <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            <div className="flex items-center gap-2">
                                <Avatar className="h-9 w-9 rounded-lg">
                                    <AvatarImage
                                        src={preview?.displayUrl || undefined}
                                        alt="preview"
                                        className="object-cover"
                                    />
                                    <AvatarFallback className="rounded-lg">
                                        <FileImage className="w-4 h-4" />
                                    </AvatarFallback>
                                </Avatar>
                                <Input
                                    type="file"
                                    {...rest}
                                    onChange={async (event) => {
                                        const { file, displayUrl } = getImageData(event);

                                        if (file) {
                                            onChange(file);
                                            setPreview?.({
                                                file,
                                                displayUrl,
                                            });
                                        }
                                    }}
                                />
                            </div>
                        </FormControl>
                        <FormMessage className="text-xs" />
                    </FormItem>
                );
            }}
        />
    );
}