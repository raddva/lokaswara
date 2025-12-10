export const HEADER_TABLE_IMAGES = [
  "No",
  "Image",
  "Title",
  "Category",
  "Action",
];

export const INITIAL_IMAGES = {
  title: "",
  description: "",
  image_url: "",
  category_id: "",
};

export const INITIAL_STATE_IMAGES = {
  status: "idle",
  errors: {
    id: [],
    title: [],
    description: [],
    image_url: [],
    category_id: [],
    _form: [],
  },
};
