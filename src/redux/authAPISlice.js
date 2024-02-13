import { apiSlice } from "./apiSlice";

export const authAPISlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/api/auth/authenticate",
        method: "POST",
        body: body,
      }),
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "/api/auth/register",
        method: "POST",
        body: body,
      }),
    }),
   
    
   
  }),
  overrideExisting: true,
});

export const {
  useLoginMutation,
  useRegisterMutation,
} = authAPISlice;
