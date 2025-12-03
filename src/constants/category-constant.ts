export const HEADER_TABLE_CATEGORY = [
  "No",
  "Name",
  "Slug",
  "Description",
  //   "Parent Category",
  "Action",
];

export const INITIAL_CATEGORY = {
  name: "",
  description: "",
  slug: "",
  parent_id: "",
};

export const INITIAL_STATE_CATEGORY = {
  status: "idle",
  errors: {
    id: [],
    name: [],
    description: [],
    slug: [],
    parent_id: [],
    _form: [],
  },
};
