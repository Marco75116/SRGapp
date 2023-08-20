import React, { FC } from "react";

import CardSearch from "./CardSelect/CardSelect";

interface pageProps {}

const page: FC<pageProps> = async () => {
  return (
    <div className="flex justify-center items-center min-h-[inherit]">
      <CardSearch />
    </div>
  );
};

export default page;
