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

export const revalidate = 1000;

const getDataPrice = async (searchAddress: string) => {
  try {
    const response = await axios.get(`${apiUrl}/prices`, {
      params: {
        address: searchAddress,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error retrieving price:", error);
    throw error;
  }
};

const getDataVolume = async (searchAddress: string) => {
  try {
    const response = await axios.get(`${apiUrl}/volumes`, {
      params: {
        address: searchAddress,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error retrieving volume:", error);
    throw error;
  }
};

const getDataLiquidity = async (searchAddress: string) => {
  try {
    const response = await axios.get(`${apiUrl}/liquidities`, {
      params: {
        address: searchAddress,
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
    blockchain: string;
  };
}

const page = async ({ params, searchParams }: pageProps) => {
  const dataPrice = await getDataPrice(params.searchAddress);
  const dataVolume = await getDataVolume(params.searchAddress);
  const dataLiquidity = await getDataLiquidity(params.searchAddress);

  return (
    <div>
      <div className="center h-[100vh] p-[20%] ">
        <Card className=" w-[100%]">
          <div className="flex justify-between">
            <CardHeader>
              <CardTitle className=" flex gap-2 items-center">
                Analytics{" "}
                <Badge variant="outline" className="capitalize">
                  {searchParams.blockchain}
                </Badge>
              </CardTitle>

              <CardDescription className="flex flex-row items-center gap-2 ">
                {params.searchAddress}
                <Link
                  href={`https://etherscan.io/token/${params.searchAddress}`}
                  target="_blank"
                >
                  <ArrowUpRight />
                </Link>
              </CardDescription>
              <SheetSide
                searchAddress={params.searchAddress}
                blockchain={searchParams.blockchain}
              />
            </CardHeader>
            <CardInfoToken searchToken={params.searchAddress} />
          </div>
          <CardContent>
            <Tabs defaultValue="Price" className="p3 w-[100%]">
              <TabsList>
                <TabsTrigger value="Price">Price Chart</TabsTrigger>
                <TabsTrigger value="Volume">Volume Chart</TabsTrigger>
                <TabsTrigger value="Liquidity">Liquidity Chart</TabsTrigger>
              </TabsList>
              <TabsContent value="Price">
                <EchartsComponent data={dataPrice} />
              </TabsContent>
              <TabsContent value="Volume">
                <VolumeChart dataVolume={dataVolume} />
              </TabsContent>
              <TabsContent value="Liquidity">
                <EchartsComponent data={dataLiquidity} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default page;
