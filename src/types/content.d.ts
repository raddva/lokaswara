export type ContentFormState = {
  status?: string;
  errors?: {
    id?: string[];
    title?: string[];
    slug?: string[];
    body?: string[];
    category_id?: string[];
    featured_image_url?: string[];
    publish_status?: string[];
    _form?: string[];
  };
};
