'use client';

import { Button } from '@/components/ui/button';
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Check, Loader2, Pencil, Plus, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import {
    createLanguage,
    deleteLanguage,
    getLanguagesRaw,
    updateLanguage,
    type Language,
} from '../actions';

export default function DialogLanguages() {
    const queryClient = useQueryClient();
    const [newLang, setNewLang] = useState('');
    const [newDesc, setNewDesc] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState({ name: '', description: '' });

    const { data: languages = [], isLoading } = useQuery({
        queryKey: ['languages_management'],
        queryFn: getLanguagesRaw,
    });

    const createMutation = useMutation({
        mutationFn: async () => createLanguage(newLang, newDesc),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['languages_management'] });
            queryClient.invalidateQueries({ queryKey: ['languagesForSelect'] });
            setNewLang('');
            setNewDesc('');
            toast.success('Language added');
        },
        onError: (err) => toast.error(err.message),
    });

    const updateMutation = useMutation({
        mutationFn: async () =>
            updateLanguage(editingId!, editForm.name, editForm.description),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['languages_management'] });
            queryClient.invalidateQueries({ queryKey: ['languagesForSelect'] });
            setEditingId(null);
            toast.success('Language updated');
        },
        onError: (err) => toast.error(err.message),
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => deleteLanguage(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['languages_management'] });
            queryClient.invalidateQueries({ queryKey: ['languagesForSelect'] });
            toast.success('Language deleted');
        },
        onError: (err) => toast.error(err.message),
    });

    const handleEditClick = (lang: Language) => {
        setEditingId(lang.id);
        setEditForm({
            name: lang.name,
            description: lang.description || '',
        });
    };

    const handleSaveEdit = () => {
        if (!editForm.name) return;
        updateMutation.mutate();
    };

    return (
        <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
                <DialogTitle>Manage Languages</DialogTitle>
                <DialogDescription>
                    Add, edit, or remove languages available for the dictionary.
                </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4 py-2">
                {/* Create Section */}
                <div className="flex flex-col gap-2 p-3 bg-muted/30 rounded-md border">
                    <span className="text-sm font-medium">Add New Language</span>
                    <div className="flex gap-2">
                        <Input
                            placeholder="Name (e.g. Sunda Loma)"
                            value={newLang}
                            onChange={(e) => setNewLang(e.target.value)}
                            className="flex-1"
                        />
                        <Input
                            placeholder="Description (Optional)"
                            value={newDesc}
                            onChange={(e) => setNewDesc(e.target.value)}
                            className="flex-1"
                        />
                        <Button
                            size="icon"
                            onClick={() => createMutation.mutate()}
                            disabled={!newLang || createMutation.isPending}
                        >
                            {createMutation.isPending ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Plus className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                </div>

                <Separator />

                <ScrollArea className="h-[300px] w-full pr-4">
                    <div className="flex flex-col gap-2">
                        {isLoading ? (
                            <div className="flex justify-center py-4">
                                <Loader2 className="animate-spin" />
                            </div>
                        ) : languages.length === 0 ? (
                            <p className="text-center text-muted-foreground text-sm py-4">
                                No languages found.
                            </p>
                        ) : (
                            languages.map((lang) => (
                                <div
                                    key={lang.id}
                                    className="flex items-center justify-between p-2 rounded-md border bg-card hover:bg-accent/10 transition-colors"
                                >
                                    {editingId === lang.id ? (
                                        <div className="flex gap-2 w-full items-center">
                                            <Input
                                                value={editForm.name}
                                                onChange={(e) =>
                                                    setEditForm({ ...editForm, name: e.target.value })
                                                }
                                                className="h-8 text-sm"
                                            />
                                            <Input
                                                value={editForm.description}
                                                placeholder="Desc"
                                                onChange={(e) =>
                                                    setEditForm({ ...editForm, description: e.target.value })
                                                }
                                                className="h-8 text-sm"
                                            />
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-8 w-8 text-green-600"
                                                onClick={handleSaveEdit}
                                                disabled={updateMutation.isPending}
                                            >
                                                <Check className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-8 w-8 text-red-400"
                                                onClick={() => setEditingId(null)}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-sm">
                                                    {lang.name}
                                                </span>
                                                {lang.description && (
                                                    <span className="text-xs text-muted-foreground">
                                                        {lang.description}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex gap-1">
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-8 w-8"
                                                    onClick={() => handleEditClick(lang)}
                                                >
                                                    <Pencil className="h-4 w-4 text-muted-foreground" />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-8 w-8 hover:bg-red-100 hover:text-red-600"
                                                    onClick={() => deleteMutation.mutate(lang.id)}
                                                    disabled={deleteMutation.isPending}
                                                >
                                                    <Trash2 className="h-4 w-4 text-red-400" />
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </ScrollArea>
            </div>
        </DialogContent>
    );
}