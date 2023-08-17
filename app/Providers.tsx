"use client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FC, ReactNode } from "react";
import { configureChains, createConfig, mainnet, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { CoinbaseWalletConnector } from "@wagmi/core/connectors/coinbaseWallet";
import MainProvider from "@/context/Main.context";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_API_KEY_RPC_MAINNET || "",
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
        appName: "uniMagnifier",
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
