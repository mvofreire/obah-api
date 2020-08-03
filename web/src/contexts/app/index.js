import React, { useContext } from "react";

export const AppContext = React.createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};
