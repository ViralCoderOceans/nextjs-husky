"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getUniById } from "../../../../services/actions";

const page = () => {
  const { uniId } = useParams();
  const [university, setUniversity] = useState();

  useEffect(() => {
    if (uniId) {
      getUniById(uniId).then((res) => setUniversity(res.university));
    }
  }, [uniId]);

  return (
    <div>
      <h1 className="font-bold text-2xl text-center my-6">Header</h1>
      <hr className="border border-black" />
      <div className="flex flex-col px-6 lg:px-10">
        {!university ? (
          <h1 className="font-bold text-3xl text-center my-6">Loading...</h1>
        ) : (
          <>
            <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-2 lg:gap-8 my-6 w-full">
              <div className="w-full lg:w-[50%]">
                <div className="bg-slate-200 h-[200px] md:h-[300px] lg:h-[400px] rounded-lg flex justify-center items-center">
                  <h1 className="font-semibold text-2xl my-6">Uni. Image</h1>
                </div>
              </div>
              <div className="rounded-lg w-full md:h-[300px] lg:h-[400px] flex flex-col justify-between lg:w-[50%]">
                <div>
                  <h1 className="font-bold text-3xl my-6">
                    {university.uni_name}
                  </h1>
                  <h1 className="font-medium text-xl mb-6">
                    World Rank:
                    <span className="font-bold ml-2">
                      {university.world_rank}
                    </span>
                  </h1>
                  <h1 className="font-medium text-xl mb-6">
                    Region:
                    <span className="font-bold ml-2">{university.region}</span>
                  </h1>
                  <h1 className="font-medium text-xl mb-6">
                    City:
                    <span className="font-bold ml-2">{university.city}</span>
                  </h1>
                </div>
                <Link
                  href={university.uni_link}
                  className="p-2 px-8 bg-slate-200 rounded-md text-xl text-center font-semibold hover:bg-black hover:text-white transition-all"
                  target="_blank"
                >
                  Visit Website
                </Link>
              </div>
            </div>
            <hr className="mb-6 bg-gradient-to-r from-white via-black to-white h-[1.5px] border-0" />
            <div>
              <h1 className="font-medium text-xl mb-6">
                {university.uni_description}
              </h1>
              <h1 className="font-medium text-xl mb-6">
                Director Name:
                <span className="font-bold ml-2">
                  {university.director_name}
                </span>
              </h1>
            </div>
            <hr className="mb-6 bg-gradient-to-r from-white via-black to-white h-[2px] border-0" />
            <div className="mb-6">
              <h1 className="font-semibold text-center text-2xl mb-6">
                Gallery
              </h1>
              <hr className="mb-6 bg-gradient-to-r from-white via-black to-white h-[2px] border-0" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-200 h-[200px] md:h-[300px] rounded-lg flex justify-center items-center">
                  <h1 className="font-semibold text-2xl my-6">Uni. Image</h1>
                </div>
                <div className="bg-slate-200 h-[200px] md:h-[300px] rounded-lg flex justify-center items-center">
                  <h1 className="font-semibold text-2xl my-6">Uni. Image</h1>
                </div>
                <div className="bg-slate-200 h-[200px] md:h-[300px] rounded-lg flex justify-center items-center">
                  <h1 className="font-semibold text-2xl my-6">Uni. Image</h1>
                </div>
              </div>
            </div>
            <hr className="mb-6 bg-gradient-to-r from-white via-black to-white h-[2px] border-0" />
            <div className="mb-6">
              <h1 className="font-semibold text-center text-2xl mb-6">
                Contact
              </h1>
              <hr className="mb-6 bg-gradient-to-r from-white via-black to-white h-[2px] border-0" />
              <h1 className="font-medium text-xl mb-6 bg-slate-100 border border-black p-3 px-4 rounded-lg">
                {university.director_description}
              </h1>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default page;
