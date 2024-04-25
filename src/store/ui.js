import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modal: "",
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openLoginModal(state) {
      state.modal = "login";
    },
    openSignupModal(state) {
      state.modal = "signup";
    },
    closeModals(state) {
      state.modal = "";
    },
  },
});

export const { openLoginModal, openSignupModal, closeModals } = uiSlice.actions;

export const selectModal = (state) => state.ui.modal;

export default uiSlice.reducer;
