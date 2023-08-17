import { mainnet } from "wagmi";
import { Blockchain, blockchainEnum } from "./types/global.types";
import { arbitrum, bsc } from "viem/chains";

export const getChaindId = (blockchain: Blockchain) => {
  try {
    const chainId =
      blockchain === blockchainEnum.mainnet
        ? mainnet.id
        : blockchain === blockchainEnum.arbitrum
        ? arbitrum.id
        : bsc.id;

    return chainId;
  } catch (error) {
    throw new Error("getChaindId failed : " + error);
  }
};
