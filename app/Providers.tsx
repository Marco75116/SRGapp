"use client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FC, ReactNode } from "react";
import { configureChains, createConfig, mainnet, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { CoinbaseWalletConnector } from "@wagmi/core/connectors/coinbaseWallet";
import MainProvider from "@/context/Main.context";
import { arbitrum, bsc } from "viem/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, arbitrum, bsc],
  [
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_API_KEY_ALCHEMY || "",
    }),
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_API_KEY_ALCHEMY_ARBITRUM || "",
    }),
    jsonRpcProvider({
      rpc: (chain) => ({
        http: process.env.NEXT_PUBLIC_RPC_BNB || "",
      }),
    }),
    publicProvider(),
  ]
);

const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "SRG20APP",
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});

interface Props {
  children: ReactNode;
}

const Providers: FC<Props> = ({ children }) => {
  return (
    <WagmiConfig config={config}>
      <TooltipProvider>
        <MainProvider>{children}</MainProvider>
      </TooltipProvider>
    </WagmiConfig>
  );
};

export default Providers;
