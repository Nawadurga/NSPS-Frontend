import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import themeReducer from "./themeSlice";
import userReducer from "./userSlice";
import { apiSlice } from "./apiSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["theme", "user"],
};

const rootReducer = combineReducers({
  theme: themeReducer,
  user: userReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export default persistReducer(persistConfig, rootReducer);
