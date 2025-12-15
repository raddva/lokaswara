export const HEADER_TABLE_FOODS = [
  "No",
  "Image",
  "Name",
  "Description",
  "Category",
  "Action",
];

export const INITIAL_FOODS = {
  name: "",
  description: "",
  ingredients: "",
  tutorial: "",
  category_id: "",
  image_url: "",
};

export const INITIAL_STATE_FOODS = {
  status: "idle",
  errors: {
    id: [],
    name: [],
    description: [],
    ingredients: [],
    tutorial: [],
    category_id: [],
    image_url: [],
    _form: [],
  },
};
