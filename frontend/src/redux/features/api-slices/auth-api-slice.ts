import type {
  LogoutResponse,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  UserRoleResponse,
} from "@/redux/types";
import { flagOpsApi } from "./base-query-setup";

export const authApi = flagOpsApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginPayload>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),

    register: builder.mutation<RegisterResponse, RegisterPayload>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),

    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

    getCurrentUser: builder.query<LoginResponse, void>({
      query: () => "/auth/me",
    }),

    getUserRole: builder.query<UserRoleResponse, void>({
      query: () => "/auth/role",
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
  useGetUserRoleQuery,
  useRegisterMutation,
} = authApi;
