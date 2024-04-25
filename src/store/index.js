import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import uiReducer from "./ui";
import settingsUIReducer from "./settings";
import messageReducer from "./message";
import sidebarReducer from "./sidebar";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    settingsUI: settingsUIReducer,
    message: messageReducer,
    sidebar: sidebarReducer,
  },
});

const useAppDispatch = useDispatch;
const useAppSelector = useSelector;

export { store, useAppDispatch, useAppSelector };
