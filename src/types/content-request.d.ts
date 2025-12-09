export type ContentRequestFormState = {
  status?: string;
  errors?: {
    content_type?: string[];
    subject?: string[];
    body?: string[];
    user_email?: string[];
    request_date?: string[];
    reviewed_by?: string[];
    status?: string[];
    _form?: string[];
  };
};

type ContentRequestData = {
  id: string;
  content_type: string;
  subject: string;
  body: string;
  user_email: string;
  status: "waiting" | "accepted" | "rejected";
  request_date: string;
  reviewed_by: string | null;
};
