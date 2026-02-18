import type { LoginPayload, LoginResponse } from "@/redux/types";
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
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

    getCurrentUser: builder.query<LoginResponse, void>({
      query: () => "/auth/me",
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useGetCurrentUserQuery } =
  authApi;
