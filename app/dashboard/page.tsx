import React, { FC } from "react";

import axios from "axios";
import CardSearch from "./CardSelect/CardSelect";

export const revalidate = 1000;

const getData = async () => {
  try {
    const response = await axios.get("http://localhost:6002/prices");
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
