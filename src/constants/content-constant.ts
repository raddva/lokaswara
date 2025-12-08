export const HEADER_TABLE_CONTENT = [
  "No",
  "Image",
  "Title",
  "Category",
  "Status",
  "Action",
];

export const INITIAL_CONTENT = {
  title: "",
  slug: "",
  body: "",
  category_id: "",
  featured_image_url: "",
  publish_status: "draft" as "draft" | "published" | "archived",
};

export const INITIAL_STATE_CONTENT = {
  status: "idle",
  errors: {
    id: [],
    title: [],
    slug: [],
    body: [],
    category_id: [],
    featured_image_url: [],
    publish_status: [],
    _form: [],
  },
};

export const PUBLISH_STATUS_LIST = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "archived", label: "Archived" },
];

export const statusStyles: Record<string, string> = {
  draft: "bg-gray-500",
  public: "bg-green-600",
  published: "bg-green-600",
  archived: "bg-yellow-600",
};

export const statusLabels: Record<string, string> = {
  draft: "Draft",
  public: "Published",
  published: "Published",
  archived: "Archived",
};
