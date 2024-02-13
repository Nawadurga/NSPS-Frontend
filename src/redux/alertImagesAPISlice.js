import { apiSlice } from "./apiSlice";

export const alertImagesAPISlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAlertImages: builder.query({
      query: () => {
        return {
          url: `/api/images`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 0,
    }),
  }),
  overrideExisting: true,
});

export const { useGetAlertImagesQuery } = alertImagesAPISlice;
