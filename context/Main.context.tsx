"use client";

import { ReactNode, createContext, useState } from "react";

type MainContextProps = {};

type MainProviderProps = { children: ReactNode };

export const MainContext = createContext({} as MainContextProps);

const MainProvider = ({ children }: MainProviderProps) => {
  return <MainContext.Provider value={{}}>{children}</MainContext.Provider>;
};

export default MainProvider;
