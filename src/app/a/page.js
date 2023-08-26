"use client";

import React, { useState } from "react";

const Page = () => {
    const [name] = useState("A");
    return (
        <div>
            <h1 className="text-center font-bold">This is page {name}</h1>
        </div>
    );
};

export default Page;
