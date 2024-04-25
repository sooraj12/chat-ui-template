import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { sidebarStore } from "./sidebar";
import { settingsStore } from "./settings";
import { messageStore } from "./message";

const useGlobalStore = create(
  devtools(
    immer((...utils) => ({
      ...sidebarStore(...utils),
      ...settingsStore(...utils),
      ...messageStore(...utils),
    }))
  )
);

export { useGlobalStore };
