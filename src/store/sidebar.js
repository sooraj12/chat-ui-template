import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
};

export const uiSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    openSidebar(state) {
      state.open = true;
    },
    closeSidebar(state) {
      state.open = false;
    },
    toggleSidebar(state) {
      state.open = !state.open;
    },
  },
});

export const { openSidebar, closeSidebar, toggleSidebar } = uiSlice.actions;

export const selectSidebarOpen = (state) => state.sidebar.open;

export default uiSlice.reducer;
