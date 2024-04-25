import React from "react";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppContextProvider } from "../context/AppContext";

import { ChatPage } from "./pages/ChatPage";
import { LandingPage } from "./pages/LandingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppContextProvider>
        <LandingPage landing={true} />
      </AppContextProvider>
    ),
  },
  {
    path: "/chat/:id",
    element: (
      <AppContextProvider>
        <ChatPage />
      </AppContextProvider>
    ),
  },
]);

function App() {
  return (
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <ModalsProvider>
        <RouterProvider router={router} />
      </ModalsProvider>
    </MantineProvider>
  );
}

export { App };
