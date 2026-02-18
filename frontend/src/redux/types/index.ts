export type LoginPayload = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
};

export type LoginResponse = {
  status: string;
  message: string;
  data: {
    user: User;
  };
};
