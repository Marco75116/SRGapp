import React, { FC } from "react";
import EchartsComponent from "./echarts/EchartsComponent";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";

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
    <div>
      <div className="center h-[100vh] p-[20%] ">
        <Card className=" w-[100%]">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <EchartsComponent data={data} />
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default page;
