export type LoginPayload = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type LoginResponse = {
  status: string;
  message: string;
  data: User;
};
