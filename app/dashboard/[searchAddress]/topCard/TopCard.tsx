"use client";
import { Badge } from "@/components/ui/badge";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React, { useContext } from "react";
import SheetSide from "../sideSheet/SideSheet";
import CardInfoToken from "../cardInfoToken/CardInfoToken";
import { Blockchain } from "@/lib/types/global.types";
import { MainContext } from "@/context/Main.context";

type TopCardProps = {
  blockchain: Blockchain;
  searchAddress: string;
};

const TopCard = ({ blockchain, searchAddress }: TopCardProps) => {
  const { screenWidth } = useContext(MainContext);

  return (
    <div className="flex flex-col justify-between sm:flex-row">
      <CardHeader>
        <CardTitle className=" flex gap-2 items-center">
          Analytics{" "}
          <Badge variant="outline" className="capitalize">
            {blockchain}
          </Badge>
        </CardTitle>

        <CardDescription className="flex flex-row items-center gap-2 ">
          {screenWidth > 700
            ? searchAddress
            : searchAddress.slice(0, 6) + "..." + searchAddress.slice(-4)}
          <Link
            href={`https://etherscan.io/token/${searchAddress}`}
            target="_blank"
          >
            <ArrowUpRight />
          </Link>
        </CardDescription>
        <SheetSide searchAddress={searchAddress} blockchain={blockchain} />
      </CardHeader>
      <CardInfoToken searchToken={searchAddress} blockchain={blockchain} />
    </div>
  );
};

export default TopCard;
