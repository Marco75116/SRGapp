"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type SheetSideProps = {
  searchAddress: string;
  blockchain: string;
};

const SheetSide = ({ searchAddress, blockchain }: SheetSideProps) => {
  const [selectedBlockchain, setSelectedBlockchain] = useState<string>();
  const [addressSRG20, setAddressSRG20] = useState<string>();
  const { push } = useRouter();

  useEffect(() => {
    setSelectedBlockchain(blockchain);
    setAddressSRG20(searchAddress);
  }, [searchAddress, blockchain]);

  const srgETH = "0xcD682EF09d07668d49A8103ddD65Ff54AebFbfD";
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
                  <SelectItem value="bnbchain">BNB Chain</SelectItem>
                  <SelectItem value="arbitrum">Arbitrum</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right text-black">
                Address
              </Label>
              <div className="flex gap-2 col-span-3">
                <Input
                  id="address"
                  placeholder="Paste SRG20 address"
                  value={addressSRG20}
                  onChange={(e) => {
                    setAddressSRG20(e.target.value);
                  }}
                />
                <Button
                  variant="secondary"
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
