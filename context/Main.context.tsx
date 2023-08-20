"use client";

import { client } from "@/lib/clients/apollo.client";
import { Token } from "@/lib/types/global.types";
import { gql } from "@apollo/client";
import { ReactNode, createContext, useEffect, useState } from "react";

type MainContextProps = {
  tokens: Token[];
  setTokens: Function;
};

type MainProviderProps = { children: ReactNode };

export const MainContext = createContext({} as MainContextProps);
const tokensQuery = `
  query {
    tokens {
      symbol
      id
    }
  }
`;

const MainProvider = ({ children }: MainProviderProps) => {
  const [tokens, setTokens] = useState<Token[]>([]);

  useEffect(() => {
    client
      .query({
        query: gql(tokensQuery),
      })
      .then((res) => {
        setTokens(
          res.data.tokens.filter((token: Token) => token.symbol !== "SRG")
        );
      });
  }, []);

  return (
    <MainContext.Provider value={{ tokens, setTokens }}>
      {children}
    </MainContext.Provider>
  );
};

export default MainProvider;
