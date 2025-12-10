export const HEADER_TABLE_FEEDBACKS = [
  "No",
  "Subject",
  "Submit Date",
  "Status",
  "Action",
];

export const INITIAL_FEEDBACKS = {
  id: "",
  subject: "",
  body: "",
  user_email: "",
  status: "waiting",
  submission_date: "",
  reviewed_by: null,
};

export const INITIAL_STATE_FEEDBACKS = {
  status: "idle",
  errors: {
    subject: [],
    body: [],
    user_email: [],
    status: [],
    _form: [],
  },
};
