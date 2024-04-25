import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { setMessage } = messageSlice.actions;

export const selectMessage = (state) => state.message.message;

export default messageSlice.reducer;
