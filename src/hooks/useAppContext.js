import React from "react";
import { AppContext } from "../context/AppContext";

function useAppContext() {
    return React.useContext(AppContext);
}

export { useAppContext }