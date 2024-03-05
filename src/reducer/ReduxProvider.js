"use client";

import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./index";

const store = configureStore({
  reducer: rootReducer,
});
const ReduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
