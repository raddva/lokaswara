export type CategoryFormState = {
  status?: string;
  errors?: {
    id?: string[];
    name?: string[];
    slug?: string[];
    description?: string[];
    parent_id?: string[];
    _form?: string[];
  };
};
