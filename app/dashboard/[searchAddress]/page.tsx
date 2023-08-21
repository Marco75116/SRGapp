import React from "react";
import EchartsComponent from "./echarts/EchartsComponent";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

import VolumeChart from "./volumeChart/VolumeChart";
import SheetSide from "./sideSheet/SideSheet";
import CardInfoToken from "./cardInfoToken/CardInfoToken";
import { apiUrl } from "@/lib/constants";
import { Blockchain } from "@/lib/types/global.types";
import TopCard from "./topCard/TopCard";

// export const revalidate = 0;

const getDataPrice = async (searchAddress: string, blockchain: Blockchain) => {
  try {
    const response = await axios.get(`${apiUrl}/prices`, {
      params: {
        address: searchAddress,
        blockchain: blockchain,
        period: "d",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error retrieving price:", error);
    throw error;
  }
};

const getDataVolume = async (searchAddress: string, blockchain: Blockchain) => {
  try {
    const response = await axios.get(`${apiUrl}/volumes`, {
      params: {
        address: searchAddress,
        blockchain: blockchain,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error retrieving volume:", error);
    throw error;
  }
};

const getDataLiquidity = async (
  searchAddress: string,
  blockchain: Blockchain
) => {
  try {
    const response = await axios.get(`${apiUrl}/liquidities`, {
      params: {
        address: searchAddress,
        blockchain: blockchain,
        period: "d",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error retrieving liquidity:", error);
    throw error;
  }
};
interface pageProps {
  params: {
    searchAddress: string;
  };
  searchParams: {
    blockchain: Blockchain;
  };
}

const page = async ({ params, searchParams }: pageProps) => {
  const dataPrice = getDataPrice(params.searchAddress, searchParams.blockchain);
  const dataVolume = getDataVolume(
    params.searchAddress,
    searchParams.blockchain
  );
  const dataLiquidity = getDataLiquidity(
    params.searchAddress,
    searchParams.blockchain
  );

  const result: [
    [number, number][],
    {
      volumePeriod: [number, number][];
      swaps: [number, number][];
    },
    [number, number][]
  ] = await Promise.all([dataPrice, dataVolume, dataLiquidity]);

  return (
    <div>
      <div className="center h-[100vh]  md:p-[20%] ">
        <Card className=" w-[100%] h-[100%]  md:h-auto">
          <TopCard
            searchAddress={params.searchAddress}
            blockchain={searchParams.blockchain}
          />
          <CardContent>
            <Tabs
              defaultValue="Price"
              className="p3 w-[100%]"
              orientation="horizontal"
            >
              <TabsList>
                <TabsTrigger value="Price">Price Chart</TabsTrigger>
                <TabsTrigger value="Volume">Volume Chart</TabsTrigger>
                <TabsTrigger value="Liquidity">Liquidity Chart</TabsTrigger>
              </TabsList>
              <TabsContent value="Price">
                <EchartsComponent data={result[0]} />
              </TabsContent>
              <TabsContent value="Volume">
                <VolumeChart dataVolume={result[1]} />
              </TabsContent>
              <TabsContent value="Liquidity">
                <EchartsComponent data={result[2]} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default page;
