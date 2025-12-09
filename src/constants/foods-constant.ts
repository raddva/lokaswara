export const HEADER_TABLE_FOODS = ["No", "Image", "Name", "Category", "Action"];

export const INITIAL_FOODS = {
  name: "",
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
    ingredients: [],
    tutorial: [],
    category_id: [],
    image_url: [],
    _form: [],
  },
};
