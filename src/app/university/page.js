"use client";

import React, { useEffect, useState } from "react";
import { getUniLocatedAtRegion } from "../../../services/actions";
import SvgComponent from "@/components/SVGComponent";
import { useRouter } from "next/navigation";
import {
  Button,
  ButtonGroup,
  Tooltip,
  styled,
  tooltipClasses,
} from "@mui/material";

const svgUrl = "your-svg-file.svg";

const page = () => {
  const { push } = useRouter();
  const [selectedUniversities, setSelectedUniversities] = useState([]);
  const [selectedRegionName, setSelectedRegionName] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (name) => {
    setSelectedRegionName(name);
    setIsLoading(true);
    getUniLocatedAtRegion(name).then((res) => {
      setSelectedUniversities(res.universities);
      setIsLoading(false);
    });
  };

  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip
      {...props}
      classes={{ popper: className }}
    />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 16,
    },
  }));

  return (
    <div className="flex flex-col lg:h-screen">
      <h1 className="font-bold text-2xl text-center my-6">Header</h1>
      <hr className="border border-black" />
      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-2 my-6 h-[calc(100%-32px)] overflow-hidden w-full">
        <div className="h-full lg:px-6 w-[90%] lg:w-[50%]">
          <h1 className="font-semibold text-2xl text-center my-6">
            Map of Italy
          </h1>
          <SvgComponent
            handleClick={handleClick}
            region={selectedRegionName}
          />
        </div>
        <div className="bg-zinc-100 mx-6 h-full rounded-lg w-[90%] lg:w-[50%]">
          {!selectedRegionName ? (
            <div className="h-full w-full flex justify-center items-center px-4">
              <div className="flex flex-col justify-center items-center">
                <h1 className="font-semibold text-2xl text-center my-6">
                  Please select region on map.
                </h1>
                <h1 className="font-semibold text-2xl text-center my-6">
                  It will show Universities located to your selected Region.
                </h1>
              </div>
            </div>
          ) : isLoading ? (
            <h1 className="font-semibold text-2xl text-center my-6">
              Loading...
            </h1>
          ) : selectedUniversities.length ? (
            <div className="h-[calc(100%-72px)]">
              <h1 className="font-semibold text-2xl text-center my-6 mb-4">
                University located at {selectedRegionName}
              </h1>
              <div className="h-full overflow-y-auto">
                <div className="h-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 p-2 lg:p-6 pt-0 overflow-y-auto">
                    {selectedUniversities.map((elm) => (
                      <div
                        onClick={() => push(`university/${elm._id}`)}
                        className="rounded-lg overflow-hidden bg-white cursor-pointer shadow-md hover:shadow-xl select-none"
                      >
                        <div
                          className="h-[120px] bg-cover"
                          style={{
                            backgroundImage: 'url("university_image.jpeg")',
                          }}
                        />
                        <div class="w-full p-2 flex flex-col justify-between items-center border-t border-black">
                          {elm.uni_name.length > 20 ? (
                            <LightTooltip
                              title={elm.uni_name}
                              placement="top-start"
                              className="hidden lg:block"
                            >
                              <h1 className="w-full font-medium text-sm lg:text-base py-2 truncate">
                                {elm.uni_name}
                              </h1>
                            </LightTooltip>
                          ) : (
                            <h1 className="w-full font-medium text-sm lg:text-base py-2 truncate">
                              {elm.uni_name}
                            </h1>
                          )}
                          <hr className="w-full my-2 bg-gradient-to-r from-white via-black to-white h-[1.5px] border-0" />
                        </div>
                        <div className="w-full flex justify-end">
                          <button className="m-2 p-1 px-3 bg-zinc-200 rounded-md text-sm lg:text-sm font-normal hover:bg-zinc-800 hover:text-white transition-all">
                            Explore more
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <h1 className="font-semibold text-2xl text-center my-6">
                No University found, Please select another region.
              </h1>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
