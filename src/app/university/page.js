"use client";

import React, { useState } from "react";
import { Button } from "@mui/material";
import { getUniLocatedAtRegion } from "../../../services/actions";
import SvgComponent from "@/components/SVGComponent";

const svgUrl = "your-svg-file.svg";

const page = () => {
  const [selectedUniversities, setSelectedUniversities] = useState([]);
  const [selectedRegionName, setSelectedRegionName] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (name) => {
    setIsLoading(true);
    getUniLocatedAtRegion(name).then((res) => {
      setSelectedRegionName(name);
      setSelectedUniversities(res.universities);
      setIsLoading(false);
    });
  };

  return (
    <div className="flex flex-col ">
      <h1 className="font-bold text-2xl text-center my-6">
        Search by clicking Region
      </h1>
      <hr className="border border-black" />
      <div className="flex justify-between my-6 w-full">
        <div className="px-6 w-[50%]">
          <SvgComponent
            handleClick={handleClick}
            region={selectedRegionName}
          />
        </div>
        <div className="bg-slate-100 mx-6 rounded-lg h-full w-[50%]">
          {isLoading ? (
            <h1 className="font-semibold text-2xl text-center my-6">
              Loading...
            </h1>
          ) : selectedUniversities.length ? (
            <div className="h-full overflow-hidden">
              <h1 className="font-semibold text-2xl text-center my-6">
                University located at {selectedRegionName}
              </h1>
              <div className="overflow-y-auto">
                {selectedUniversities.map((elm) => (
                  <div className="bg-white p-4 m-4 rounded-lg border border-black">
                    <div className="flex justify-between items-center gap-2">
                      <div>
                        <h1 className="font-semibold text-xl">
                          {elm.uni_name}
                        </h1>
                        <h1 className="font-normal text-xl">Location: -</h1>
                      </div>
                      <Button variant="outlined">Website</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              <h1 className="font-semibold text-2xl text-center my-6">
                No University found, Please select region
              </h1>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
