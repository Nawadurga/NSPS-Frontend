import { apiSlice } from "./apiSlice";

export const userAPISlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchUserList: builder.query({
      query: ({ pageNo = 0, pageSize = 25 }) => ({
        url: `/api/users?pageNo=${pageNo}&pageSize=${pageSize}`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
    getUserById: builder.query({
      query: (userId) => ({
        url: `/api/users/${userId}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    createUser: builder.mutation({
      query: (body) => ({
        url: "/api/users",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Users"], // Invalidate user list cache after creation
    }),
    updateUserDetails: builder.mutation({
      query: ({ userId, updatedUser }) => ({
        url: `/api/users/${userId}`,
        method: "PATCH",
        body: updatedUser,
      }),
      invalidatesTags: ["User"], // Invalidate cached data for a single user
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/api/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users", "User"], // Invalidate both user list and single user cache
    }),
    searchUsers: builder.query({
      query: ({ query, searchBy }) => ({
        url: `/api/users/search?query=${query}&searchBy=${searchBy}`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useFetchUserListQuery,
  useLazyFetchUserListQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserDetailsMutation,
  useDeleteUserMutation,
  useLazySearchUsersQuery
} = userAPISlice;
