export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = LoginPayload & {
  name: string;
};

export type RegisterResponse = {
  status: string;
  message: string;
  data: {
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
  };
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
    token: string;
    user: User;
  };
};

export type UserRoleResponse = {
  status: string;
  data: {
    role: string;
  };
};
