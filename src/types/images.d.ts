export type ImagesFormState = {
  status?: string;
  errors?: {
    id?: string[];
    title?: string[];
    description?: string[];
    image_url?: string[];
    category_id?: string[];
    _form?: string[];
  };
};
