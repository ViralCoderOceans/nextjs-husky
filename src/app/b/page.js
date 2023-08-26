"use client";

import React, { useState } from "react";

const Page = () => {
  // const [name] = useState("B");
  const [name] = useState("B");
  return (
    <div>
      <h1 className="text-center text-3xl font-bold">Test Page</h1>

      <h1 className="text-center text-3xl font-bold">This is page {name}</h1>
      <p>Hello</p>
    </div>
  );
};

export default Page;
