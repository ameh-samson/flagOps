import { envProduction } from "@/utils/envProduction";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQuery = fetchBaseQuery({
  baseUrl: envProduction.BASE_URL,
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");

    const token = sessionStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const flagOpsApi = createApi({
  reducerPath: "flagOpsApi",
  baseQuery,
  tagTypes: ["Auth", "Flags", "User"],
  endpoints: () => ({}),
});
