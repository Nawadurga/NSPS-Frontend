import { apiSlice } from "./apiSlice";

export const vehicleAPISlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchVehicleList: builder.query({
      query: ({ pageNo = 1, pageSize = 10 }) => ({
        url: `/api/vehicles?pageNo=${pageNo}&pageSize=${pageSize}`,
        method: "GET",
      }),
      providesTags: ["Vehicles"],
    }),
    getVehicleById: builder.query({
      query: (vehicleId) => ({
        url: `/api/vehicles/${vehicleId}`,
        method: "GET",
      }),
      providesTags: ["Vehicle"],
    }),
    getVehicleByUserId: builder.query({
      query: (userId) => ({
        url: `/api/vehicles/users/${userId}`,
        method: "GET",
      }),
      providesTags: ["Vehicles"],
    }),
    createVehicle: builder.mutation({
      query: ({ userId, body }) => ({
        url: `/api/vehicles/users/${userId}`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Vehicles", "Users", "User", "Notifications"], // Invalidate vehicle list cache after creation
    }),
    updateVehicleDetails: builder.mutation({
      query: ({ vehicleId, updatedVehicle }) => ({
        url: `/api/vehicles/${vehicleId}`,
        method: "PATCH",
        body: updatedVehicle,
      }),
      invalidatesTags: ["Vehicle", "User", "Notifications"], // Invalidate cached data for a single vehicle
    }),
    deleteVehicle: builder.mutation({
      query: (vehicleId) => ({
        url: `/api/vehicles/${vehicleId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Vehicles", "Vehicle", "User", "Users"], // Invalidate both vehicle list and single vehicle cache
    }),

    findVehicleStampsByVehicleId: builder.query({
      query: ({
        vehicleId,
        startDate,
        endDate,
        pageNo = 0,
        pageSize = 10,
      }) => ({
        url: `/api/vehicle-entry-exit-stamps/vehicles/${vehicleId}?pageNo=${pageNo}&pageSize=${pageSize}`,
        method: "GET",
      }),
      providesTags: ["VehicleEntryExitStamp"],
    }),
    getParkingStatus: builder.query({
      query: () => ({
        url: `/api/vehicles/parking-slots-status`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),
  }),
  overrideExisting: true,
});

export const {
  useFetchVehicleListQuery,
  useGetVehicleByUserIdQuery,
  useLazyGetVehicleByUserIdQuery,
  useGetVehicleByIdQuery,
  useCreateVehicleMutation,
  useUpdateVehicleDetailsMutation,
  useDeleteVehicleMutation,

  useLazyFindVehicleStampsByVehicleIdQuery,
  useGetParkingStatusQuery
} = vehicleAPISlice;
