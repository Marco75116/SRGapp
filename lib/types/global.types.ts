export const blockchainEnum = {
  mainnet: "mainnet",
  bnbchain: "bnbchain",
  arbitrum: "arbitrum",
} as const;

export type Blockchain = (typeof blockchainEnum)[keyof typeof blockchainEnum];

export type Token = {
  symbol: string;
  id: string;
};
