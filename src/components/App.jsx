import React from "react";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppContextProvider } from "../context/AppContext";
import store from "../store";

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
  {
    path: "/s/:id",
    element: (
      <AppContextProvider>
        <ChatPage share={true} />
      </AppContextProvider>
    ),
  },
  {
    path: "/s/:id/*",
    element: (
      <AppContextProvider>
        <ChatPage share={true} />
      </AppContextProvider>
    ),
  },
]);

function App() {
  return (
    <MantineProvider theme={{ colorScheme: "dark" }}>
      <Provider store={store}>
        <ModalsProvider>
          <RouterProvider router={router} />
        </ModalsProvider>
      </Provider>
    </MantineProvider>
  );
}

export { App };
