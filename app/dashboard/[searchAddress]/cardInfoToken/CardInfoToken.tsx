"use client";
import React, { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Coins } from "lucide-react";
import { Address } from "viem";
import { useContractReads } from "wagmi";
import { abiSrg20 } from "@/lib/abi/abiSRG20";

type CardInfoTokenProps = {
  searchToken: string;
};

const CardInfoToken = ({ searchToken }: CardInfoTokenProps) => {
  const [symbol, setSymbol] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [decimals, setDecimals] = useState<number>(0);
  const [srgPrice, setSrgPrice] = useState<number>(0);
  const [calulatedPrice, setCalulatedPrice] = useState<number>(0);
  const [marketCap, setMarketCap] = useState<number>(0);

  useContractReads({
    contracts: [
      {
        address: searchToken as Address,
        abi: abiSrg20 as any,
        functionName: "symbol",
      },
      {
        address: searchToken as Address,
        abi: abiSrg20 as any,
        functionName: "decimals",
      },
      {
        address: searchToken as Address,
        abi: abiSrg20 as any,
        functionName: "name",
      },
      {
        address: searchToken as Address,
        abi: abiSrg20 as any,
        functionName: "calculatePrice",
      },
      {
        address: searchToken as Address,
        abi: abiSrg20 as any,
        functionName: "getSRGPrice",
      },
      {
        address: searchToken as Address,
        abi: abiSrg20 as any,
        functionName: "getMarketCap",
      },
    ],
    onSuccess(data: any) {
      setSymbol(data[0].result);
      setDecimals(data[1].result);
      setName(data[2].result);
      setCalulatedPrice(Number(data[3].result));
      setSrgPrice(Number(data[4].result));
      setMarketCap(Number(data[5].result));
    },
    watch: true,
  }) as any;

  const actualPrice = useMemo(() => {
    const padding = 10 ** 18;
    const factorSrgPrice = 10 ** 15;
    return (srgPrice * calulatedPrice) / (padding * factorSrgPrice);
  }, [calulatedPrice, srgPrice]);

  const marketCapUSD = useMemo(() => {
    const padding = 10 ** 18;
    const factorSrgPrice = 10 ** 15;
    const factorDecimals = 10 ** decimals;
    return marketCap / (padding * factorSrgPrice * factorDecimals);
  }, [marketCap, decimals]);

  return (
    <Card className="m-6  w-80">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex flex-row">
          {name} Token &nbsp; <CardDescription>({symbol})</CardDescription>
        </CardTitle>

        <Coins />
      </CardHeader>
      <CardContent>
        <div className="text-xl font-bold">
          Price actual : ${actualPrice.toFixed(8)}
        </div>
        <p className="text-xs text-gray-500">
          Market Cap: ${marketCapUSD.toFixed(0)}
        </p>
        <p className="text-xs text-gray-500">Decimals : {decimals}</p>
      </CardContent>
    </Card>
  );
};

export default CardInfoToken;
