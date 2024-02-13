import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import config from "../config/config.json";
import { setSessionExpired } from "./userSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: config.BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().user.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (
    result.error &&
    result.error.status === 401 &&
    result.error.data.message === "JWT Invalid token"
  ) {
    api.dispatch(setSessionExpired(true));
    return { error: { status: 401, data: null } };
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Users",
    "User",
    "Vehicles",
    "Vehicle",
    "VehicleEntryExitStamp",
    "Notifications",
  ],
  endpoints: (builder) => ({}),
});
