import React from "react";
import { useCreatAppContext } from "../hooks";

const AppContext = React.createContext();

function AppContextProvider(props) {
  const context = useCreatAppContext();
  return (
    <AppContext.Provider value={context}>{props.children}</AppContext.Provider>
  );
}

export { AppContextProvider, AppContext };
