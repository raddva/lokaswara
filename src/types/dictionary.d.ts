export type DictionaryFormState = {
  status?: string;
  errors?: {
    id?: string[];
    word?: string[];
    meaning?: string[];
    synonym?: string[];
    pronunciation?: string[];
    language_id?: string[];
    _form?: string[];
  };
};
