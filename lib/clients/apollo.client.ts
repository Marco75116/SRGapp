import { ApolloClient, InMemoryCache } from "@apollo/client";

const APIURL =
  "https://api.thegraph.com/subgraphs/name/somemoecoding/surgeswap-v1-eth";

export const client = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
});
