import Image from "next/image";
import React from "react";

export const NoData = () => {
  console.log("No Data Available");
  return (
    <div className="flex flex-col gap-4">
      <Image src={"/no-data.png"} width={200} height={200} alt="No Data" />
      <h3 className="text-2xl font-semibold text-center">No Data Available</h3>
    </div>
  );
};
