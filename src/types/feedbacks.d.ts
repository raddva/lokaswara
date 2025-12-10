export type ContentRequestFormState = {
  status?: string;
  errors?: {
    subject?: string[];
    body?: string[];
    user_email?: string[];
    status?: string[];
    submission_date?: string[];
    reviewed_by?: string[];
    _form?: string[];
  };
};

type FeedbacksData = {
  id: string;
  subject: string;
  body: string;
  user_email: string;
  status: "waiting" | "accepted" | "rejected";
  submission_date: string;
  reviewed_by: string | null;
};
