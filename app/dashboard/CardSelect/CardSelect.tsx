"use client";
import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

const CardSearch = () => {
  const { push } = useRouter();
  const [addressSRG20, setAddressSRG20] = useState<string>();
  const srgETH = "0xcD682EF09d07668d49A8103ddD65Ff54AebFbfDe";

  const [selectedBlockchain, setSelectedBlockchain] = useState<string>();

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
                onValueChange={(e) => {
                  setSelectedBlockchain(e);
                }}
              >
                <SelectTrigger id="DexVersion">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="mainnet">Mainnet</SelectItem>
                  <SelectItem value="bnbchain">BNB Chain</SelectItem>
                  <SelectItem value="arbitrum">Arbitrum</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="address">Address</Label>
              <div className="flex gap-2">
                <Input
                  id="address"
                  placeholder="Paste SRG20 address"
                  value={addressSRG20}
                  onChange={(e) => {
                    setAddressSRG20(e.target.value);
                  }}
                />
                <Button
                  type="button"
                  onClick={() => {
                    setAddressSRG20(srgETH);
                  }}
                >
                  Native
                </Button>
              </div>
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
