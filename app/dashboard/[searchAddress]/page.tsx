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
import { ArrowUpRight, Coins } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

import VolumeChart from "./volumeChart/VolumeChart";
import SheetSide from "./sideSheet/SideSheet";

export const revalidate = 1000;

const getDataPrice = async (searchAddress: string) => {
  try {
    const response = await axios.get("http://localhost:6002/prices", {
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
    const response = await axios.get("http://localhost:6002/volumes", {
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
interface pageProps {
  params: {
    searchAddress: string;
  };
  searchParams: {
    blockchain: string;
  };
}

const page = async ({ params, searchParams }: pageProps) => {
  const data = await getDataPrice(params.searchAddress);
  const dataVolume = await getDataVolume(params.searchAddress);

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
            <Card className="m-6 h-40 w-80">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  SURGE Token
                </CardTitle>
                <Coins />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">Price actual : 0.00252$</div>
                <p className="text-xs text-gray-500">
                  Total liquity : $8366377363636
                </p>
                <p className="text-xs text-gray-500">Decimals : 9</p>
                <p className="text-xs text-gray-500">
                  Liquity : 83663773636363636
                </p>
              </CardContent>
            </Card>
          </div>
          <CardContent>
            <Tabs defaultValue="Price" className="p3 w-[100%]">
              <TabsList>
                <TabsTrigger value="Price">Price Chart</TabsTrigger>
                <TabsTrigger value="Volume">Volume Chart</TabsTrigger>
              </TabsList>
              <TabsContent value="Price">
                <EchartsComponent data={data} />
              </TabsContent>
              <TabsContent value="Volume">
                <VolumeChart dataVolume={dataVolume} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default page;
