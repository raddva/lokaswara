'use client';

import DataTable from '@/components/common/datatable';
import DropdownAction from '@/components/common/dropdown-action';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import useDataTable from '@/hooks/use-datatable';
import { createClient } from '@/lib/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Pencil, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { HEADER_TABLE_DICTIONARY } from '@/constants/dictionary-constant';
import DialogCreateDictionary from './dialog-create-dictionary';
import DialogUpdateDictionary from './dialog-update-dictionary';
import DialogDeleteDictionary from './dialog-delete-dictionary';
import { LanguageSelectItem, getLanguages } from '../actions';
import type { Dictionary } from '@/validations/dictionary-validation';

export default function Dictionary() {
    const supabase = createClient();
    const {
        currentPage,
        currentLimit,
        currentSearch,
        handleChangePage,
        handleChangeLimit,
        handleChangeSearch,
    } = useDataTable();

    const {
        data: dictionary,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['dictionary', currentPage, currentLimit, currentSearch],
        queryFn: async () => {
            const query = supabase
                .from('dictionary')
                .select('*', { count: 'exact' })
                .range((currentPage - 1) * currentLimit, currentPage * currentLimit - 1)
                .order('created_at', { ascending: false });

            if (currentSearch) {
                query.or(`word.ilike.%${currentSearch}%`);
            }

            const result = await query;

            if (result.error)
                toast.error('Get Dictionary data failed', {
                    description: result.error.message,
                });

            return result;
        },
    });

    const { data: languageList = [], isLoading: isLoadingDictionaryList } = useQuery<LanguageSelectItem[]>({
        queryKey: ['languagesForSelect'],
        queryFn: getLanguages,
    });

    const [selectedAction, setSelectedAction] = useState<{
        data: Dictionary;
        type: 'update' | 'delete';
    } | null>(null);

    const handleChangeAction = (open: boolean) => {
        if (!open) setSelectedAction(null);
    };

    const filteredData = useMemo(() => {
        return (dictionary?.data || []).map((dictionary: Dictionary, index) => {
            const uniqueKey = `${dictionary.id}-${index}`;

            const languageName = languageList.find((c) => c.value === dictionary.language_id)?.label || dictionary.language_id;

            return [
                currentLimit * (currentPage - 1) + index + 1,
                <div key={`word-${uniqueKey}`} className="flex items-center gap-2">
                    {dictionary.word}
                </div>,
                // <div key={`meaning-${uniqueKey}`} className="flex items-center gap-2">
                //     {dictionary.meaning}
                // </div>,
                <div key={`synonym-${uniqueKey}`} className="flex items-center gap-2">
                    {dictionary.synonym}
                </div>,
                <div key={`pronunciation-${uniqueKey}`} className="flex items-center gap-2">
                    {dictionary.pronunciation}
                </div>,
                <span key={`language-${uniqueKey}`}>{languageName}</span>,
                <DropdownAction
                    key={`action-${uniqueKey}`}
                    menu={[
                        {
                            label: (
                                <span className="flex items-center gap-2">
                                    <Pencil /> Edit
                                </span>
                            ),
                            action: () => {
                                setSelectedAction({
                                    data: dictionary,
                                    type: 'update',
                                });
                            },
                        },
                        {
                            label: (
                                <span className="flex items-center gap-2">
                                    <Trash2 className="text-red-400" /> Delete
                                </span>
                            ),
                            variant: 'destructive',
                            action: () => {
                                setSelectedAction({
                                    data: dictionary,
                                    type: 'delete',
                                });
                            },
                        },
                    ]}
                />,
            ];
        });
    }, [dictionary, currentPage, currentLimit, languageList]);

    const totalPages = useMemo(() => {
        return dictionary && dictionary.count !== null
            ? Math.ceil(dictionary.count / currentLimit)
            : 0;
    }, [dictionary, currentLimit]);

    return (
        <div className="w-full">
            <div className="flex flex-col lg:flex-row mb-4 gap-2 justify-between w-full">
                <h1 className="text-2xl font-bold">Dictionary Management</h1>
                <div className="flex gap-2">
                    <Input
                        placeholder="Search..."
                        onChange={(e) => handleChangeSearch(e.target.value)}
                    />
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" disabled={isLoadingDictionaryList}>
                                {isLoadingDictionaryList ? 'Loading...' : 'Create'}
                            </Button>
                        </DialogTrigger>

                        <DialogCreateDictionary
                            refetch={refetch}
                            languageList={languageList}
                        />
                    </Dialog>
                </div>
            </div>

            <DataTable
                header={HEADER_TABLE_DICTIONARY}
                data={filteredData}
                isLoading={isLoading}
                totalPages={totalPages}
                currentPage={currentPage}
                currentLimit={currentLimit}
                onChangePage={handleChangePage}
                onChangeLimit={handleChangeLimit}
            />

            {selectedAction?.type === 'update' && (
                <DialogUpdateDictionary
                    open={true}
                    refetch={refetch}
                    currentData={selectedAction.data}
                    handleChangeAction={handleChangeAction}
                    languageList={languageList}
                />
            )}

            {selectedAction?.type === 'delete' && (
                <DialogDeleteDictionary
                    open={true}
                    refetch={refetch}
                    currentData={selectedAction.data}
                    handleChangeAction={handleChangeAction}
                />
            )}
        </div>
    );
}