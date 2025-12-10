export type VideosFormState = {
  status?: string;
  errors?: {
    id?: string[];
    title?: string[];
    description?: string[];
    youtube_url?: string[];
    language_id?: string[];
    content_id?: string[];
    publish_status?: string[];
    _form?: string[];
  };
};
