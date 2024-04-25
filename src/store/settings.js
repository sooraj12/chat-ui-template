import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tab: "",
  option: "",
};

export const settingsUISlice = createSlice({
  name: "settingsUI",
  initialState,
  reducers: {
    setTab: (state, action) => {
      state.tab = action.payload || "";
    },
    setOption: (state, action) => {
      state.option = action.payload || "";
    },
    setTabAndOption: (state, action) => {
      state.tab = action.payload.tab || "";
      state.option = action.payload.option || "";
    },
  },
});

export const { setTab, setOption, setTabAndOption } = settingsUISlice.actions;

export const closeSettingsUI = () =>
  settingsUISlice.actions.setTabAndOption({ tab: "", option: "" });

export const selectSettingsTab = (state) => state.settingsUI.tab;
export const selectSettingsOption = (state) => state.settingsUI.option;

export const openSystemPromptPanel = () =>
  settingsUISlice.actions.setTabAndOption({
    tab: "options",
    option: "systemPrompt",
  });

export const openTemperaturePanel = () =>
  settingsUISlice.actions.setTabAndOption({
    tab: "options",
    option: "temperature",
  });

export default settingsUISlice.reducer;
