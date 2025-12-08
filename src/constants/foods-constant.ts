export const HEADER_TABLE_CONTENT = [
  "No",
  "Image",
  "Name",
  "Category",
  "Action",
];

export const INITIAL_CONTENT = {
  name: "",
  ingredients: "",
  tutorial: "",
  category_id: "",
  image_url: "",
};

export const INITIAL_STATE_CONTENT = {
  status: "idle",
  errors: {
    id: [],
    name: [],
    ingredients: [],
    tutorial: [],
    category_id: [],
    image_url: [],
    _form: [],
  },
};
