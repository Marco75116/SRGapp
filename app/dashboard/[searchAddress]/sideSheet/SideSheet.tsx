"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Blockchain } from "@/lib/types/global.types";
import { MainContext } from "@/context/Main.context";

type SheetSideProps = {
  searchAddress: string;
  blockchain: Blockchain;
};

const SheetSide = ({ searchAddress, blockchain }: SheetSideProps) => {
  const [selectedBlockchain, setSelectedBlockchain] = useState<string>();
  const [addressSRG20, setAddressSRG20] = useState<string>();
  const { push } = useRouter();
  const { tokens } = useContext(MainContext);

  const idTokenSelected = useMemo(() => {
    return tokens.find((token) => token.id === addressSRG20)?.id;
  }, [tokens, addressSRG20]);

  useEffect(() => {
    setSelectedBlockchain(blockchain);
    setAddressSRG20(searchAddress);
  }, [searchAddress, blockchain]);

  return (
    <div className="grid grid-cols-2 gap-2">
      <Sheet key={"right"}>
        <SheetTrigger asChild>
          <Button variant="outline">Modify</Button>
        </SheetTrigger>
        <SheetContent side={"right"}>
          <SheetHeader>
            <SheetTitle>Edit Search</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you`&apos;`re
              done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4 text-black">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right text-black">
                Blockchain
              </Label>
              <Select
                onValueChange={(e) => {
                  setSelectedBlockchain(e);
                }}
                value={selectedBlockchain}
              >
                <SelectTrigger className="col-span-3" id="DexVersion">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="mainnet">Mainnet</SelectItem>
                  {/* <SelectItem value="bnbchain">BNB Chain</SelectItem> */}
                  {/* <SelectItem value="arbitrum">Arbitrum</SelectItem> */}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="DexVersion">SRG20</Label>
              <Select
                value={idTokenSelected}
                onValueChange={(e: Blockchain) => {
                  setAddressSRG20(e);
                }}
              >
                <SelectTrigger id="DexVersion" className="col-span-3">
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
          <SheetFooter className="">
            <SheetClose asChild>
              <Button
                type="submit"
                onClick={() => {
                  push(
                    `/dashboard/${addressSRG20}?blockchain=${selectedBlockchain}`
                  );
                }}
              >
                Save changes
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SheetSide;
