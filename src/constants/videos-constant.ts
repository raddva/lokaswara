export const HEADER_TABLE_VIDEOS = [
  "No",
  "Title",
  "Language",
  "Content",
  "Publish Status",
  "Action",
];

export const INITIAL_VIDEOS = {
  title: "",
  description: "",
  youtube_url: "",
  language_id: "",
  content_id: "",
  publish_status: "draft" as "draft" | "published" | "archived",
};

export const INITIAL_STATE_VIDEOS = {
  status: "idle",
  errors: {
    id: [],
    title: [],
    description: [],
    youtube_url: [],
    language_id: [],
    content_id: [],
    publish_status: [],
    _form: [],
  },
};
