"use client";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { Blockchain } from "@/lib/types/global.types";
import { MainContext } from "@/context/Main.context";

type CardSearchProps = {};

const CardSearch = ({}: CardSearchProps) => {
  const { push } = useRouter();
  const [addressSRG20, setAddressSRG20] = useState<string>();

  const [selectedBlockchain, setSelectedBlockchain] = useState<Blockchain>();
  const { tokens } = useContext(MainContext);

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle> Surge </CardTitle>
        <CardDescription>Analyze an SRG20 token</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="DexVersion">Blockchain</Label>
              <Select
                onValueChange={(e: Blockchain) => {
                  setSelectedBlockchain(e);
                }}
              >
                <SelectTrigger id="DexVersion">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="mainnet">Mainnet</SelectItem>
                  {/* <SelectItem value="bnbchain">BNB Chain</SelectItem> */}
                  {/* <SelectItem value="arbitrum">Arbitrum</SelectItem> */}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="DexVersion">SRG20</Label>
              <Select
                onValueChange={(e: Blockchain) => {
                  setAddressSRG20(e);
                }}
              >
                <SelectTrigger id="DexVersion">
                  <SelectValue placeholder="Select token" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {tokens.map((token, index) => {
                    return (
                      <SelectItem key={index} value={token.id}>
                        {token.symbol}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          onClick={() => {
            push(`/dashboard/${addressSRG20}?blockchain=${selectedBlockchain}`);
          }}
          disabled={!addressSRG20 || !selectedBlockchain}
        >
          View Swaps
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardSearch;
