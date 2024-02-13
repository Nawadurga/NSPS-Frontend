import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./src/redux/store";

import MyApp from "./src/Screen/MyApp";

export default function App() {
  return (
    <>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MyApp />
        </PersistGate>
      </ReduxProvider>
    </>
  );
}
