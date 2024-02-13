import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  userId: "",
  isAdmin: false,
  token: "",
  phoneNo: "",
  isAuthenticated: false,
  isSendNotificationToken: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.name = action.payload.name;
      state.userId = action.payload.id;
      state.isAdmin = action.payload.isAdmin;
      state.token = action.payload.token;
      state.phoneNo = action.payload.phoneNo;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.name = "";
      state.phoneNo = "";
      state.userId = "";
      state.token = "";
      state.paymentExpireDate = "";
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.isSendNotificationToken = false;
    },
    notificationTokenSended: (state, action) => {
      state.isSendNotificationToken = true;
    },
  },
});

export const selectUser = (state) => {
  return state.user;
};

export const { login, logout, notificationTokenSended } = userSlice.actions;

export default userSlice.reducer;
