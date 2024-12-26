"use client";

import ProductLists from "@/components/Admin/ProductLists";
import React from "react";

const page = () => {
  return (
    <div className="flex-1 p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <ProductLists />
    </div>
  );
};

export default page;
