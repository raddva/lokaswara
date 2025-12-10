export const HEADER_TABLE_CONTENT_REQUEST = [
  "No",
  "Type",
  "Subject",
  "Request Date",
  "Status",
  "Action",
];

export const INITIAL_CONTENT_REQUEST = {
  id: "",
  content_type: "",
  subject: "",
  body: "",
  user_email: "",
  status: "waiting",
  request_date: "",
  reviewed_by: null,
};

export const INITIAL_STATE_CONTENT_REQUEST = {
  status: "idle",
  errors: {
    content_type: [],
    subject: [],
    body: [],
    user_email: [],
    status: [],
    _form: [],
  },
};
