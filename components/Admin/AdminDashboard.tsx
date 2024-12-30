"use client";

import React, { useEffect, useState } from "react";
import ProductLists from "./ProductLists";
import AddImage from "./AddImage";
import ProductOrder from "./ProductOrder";
import { useRouter, useSearchParams } from "next/navigation";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const searchParams = useSearchParams();
  const router = useRouter();

  const tab = searchParams.get("tab");
  useEffect(() => {
    if (tab) {
      switch (tab) {
        case "productlists":
          setActiveTab(0);
          break;
        case "imageupload":
          setActiveTab(1);
          break;
        case "customers":
          setActiveTab(2);
          break;
        case "orders":
          setActiveTab(3);
          break;
        default:
          setActiveTab(0);
      }
    }
  }, [tab]);

  const handleClick = (tab: number, tabName: string) => {
    setActiveTab(tab);
    router.push(`/admin/admindashboard?tab=${tabName}`);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="w-72 bg-gray-900 text-white p-6 shadow-xl border-r border-gray-700">
        <h2 className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
          Dashboard
        </h2>
        <ul className="space-y-4">
          <li>
            <a
              href="#"
              className={`flex items-center p-3 rounded-lg transition-all duration-300 ease-in-out
                ${
                  activeTab === 0
                    ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border-l-4 border-blue-400"
                    : "hover:bg-gray-800/50 text-gray-300 hover:text-white"
                }`}
              onClick={() => handleClick(0, "productlists")}
            >
              <span className="ml-2">Product Lists</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`flex items-center p-3 rounded-lg transition-all duration-300 ease-in-out
                ${
                  activeTab === 1
                    ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border-l-4 border-blue-400"
                    : "hover:bg-gray-800/50 text-gray-300 hover:text-white"
                }`}
              onClick={() => handleClick(1, "imageupload")}
            >
              <span className="ml-2">Image Upload</span>
            </a>
          </li>

          <li>
            <a
              href="#"
              className={`flex items-center p-3 rounded-lg transition-all duration-300 ease-in-out
                ${
                  activeTab === 3
                    ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border-l-4 border-blue-400"
                    : "hover:bg-gray-800/50 text-gray-300 hover:text-white"
                }`}
              onClick={() => handleClick(3, "orders")}
            >
              <span className="ml-2">Orders</span>
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 w-[calc(100%-18rem)] p-6">
        <div className="h-full rounded-xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 p-6 shadow-lg">
          {activeTab === 0 && (
            <div className="animate-fadeIn">
              <ProductLists />
            </div>
          )}

          {activeTab === 1 && (
            <div className="animate-fadeIn">
              <AddImage onImageData={(data) => console.log(data)} />
            </div>
          )}

          {activeTab === 3 && (
            <div className="animate-fadeIn">
              <ProductOrder />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
