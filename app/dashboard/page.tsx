import React, { FC } from "react";
import EchartsComponent from "./[searchAddress]/echarts/EchartsComponent";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import CardSearch from "./CardSelect/CardSelect";

export const revalidate = 10;

const getData = async () => {
  try {
    const response = await axios.get("http://localhost:6002/");
    return response.data;
  } catch (error) {
    console.error("Error retrieving data:", error);
    throw error;
  }
};
interface pageProps {}

const page: FC<pageProps> = async () => {
  const data = await getData();

  return (
    <div className="flex justify-center items-center min-h-[inherit]">
      <CardSearch />
    </div>
  );
};

export default page;
