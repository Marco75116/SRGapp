import React, { FC } from "react";

import axios from "axios";
import CardSearch from "./CardSelect/CardSelect";

export const revalidate = 1000;

interface pageProps {}

const page: FC<pageProps> = async () => {
  return (
    <div className="flex justify-center items-center min-h-[inherit]">
      <CardSearch />
    </div>
  );
};

export default page;
