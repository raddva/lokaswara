import { AuthFormState } from "@/types/auth";

export const INITIAL_SIGNIN_FORM = {
  email: "",
  password: "",
};

export const INITIAL_STATE_SIGNIN_FORM: AuthFormState = {
  status: "idle",
  errors: {},
};

export const INITIAL_STATE_PROFILE = {
  id: "",
  name: "",
  role: "",
  avatar_url: "",
};

export const INITIAL_CREATE_USER_FORM = {
  name: "",
  role: "",
  avatar_url: "",
  email: "",
  password: "",
};

export const INITIAL_STATE_CREATE_USER = {
  status: "idle",
  errors: {
    email: [],
    password: [],
    name: [],
    role: [],
    avatar_url: [],
    _form: [],
  },
};

export const INITIAL_STATE_UPDATE_USER = {
  status: "idle",
  errors: {
    name: [],
    role: [],
    avatar_url: [],
    _form: [],
  },
};

export const ROLE_LIST = [
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "user",
    label: "User",
  },
];
