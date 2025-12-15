export type FoodsFormState = {
  status?: string;
  errors?: {
    id?: string[];
    name?: string[];
    slug?: string[];
    description?: string[];
    image_url?: string[];
    ingredients?: string[];
    tutorial?: string[];
    category_id?: string[];
    _form?: string[];
  };
};
