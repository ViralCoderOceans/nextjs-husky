import MapComponent from "@/components/MapComponent";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col ">
      <h1 className="font-bold text-2xl text-center my-6">
        Search by clicking Region
      </h1>
      <div className="flex justify-between items-center my-6">
        <div className="px-6">
          <MapComponent />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default page;
