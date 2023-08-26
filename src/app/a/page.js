"use client";

import React, { useState } from "react";

const Page = () => {
  // const [name] = useState("A");
  const [name] = useState("A");
  return (
    <div>
      <h1 className="text-center text-3xl font-bold">This is page {name}</h1>

      <h1>Hello world</h1>
    </div>
  );
};

export default Page;
