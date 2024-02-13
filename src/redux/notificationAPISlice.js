import { apiSlice } from "./apiSlice";

export const notificationAPISlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotification: builder.query({
      query: (userId) => {
        return {
          url: `/api/notifications/users/${userId}`,
          method: "GET",
        };
      },
      providesTags: ["Notifications"],
      keepUnusedDataFor: 0,
    }),

    createNotificationToken: builder.mutation({
      query: ({ userId, notificationToken }) => {
        return {
          url: `/api/notifications-token/users/${userId}`,
          method: "POST",
          body: notificationToken,
        };
      },
    }),

  }),
  overrideExisting: true,
});

export const { useGetNotificationQuery , useCreateNotificationTokenMutation} = notificationAPISlice;
