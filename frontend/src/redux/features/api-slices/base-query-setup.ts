import { envProduction } from "@/utils/envProduction";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQuery = fetchBaseQuery({
  baseUrl: envProduction.BASE_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

export const flagOpsApi = createApi({
  reducerPath: "flagOpsApi",
  baseQuery,
  tagTypes: ['Auth', 'Flags', 'User'],
  endpoints: () => ({}),
});
