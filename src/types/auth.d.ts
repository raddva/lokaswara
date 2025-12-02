export type AuthFormState = {
  status: "idle" | "error" | "success";
  errors?: {
    _form?: string[];
    email?: string[];
    password?: string[];
    name?: string[];
    role?: string[];
  };
};

export type Profile = {
  id?: string;
  name?: string;
  role?: string;
};
