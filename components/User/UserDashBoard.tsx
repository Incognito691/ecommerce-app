"use client";

import React, { useEffect, useState } from "react";
import Products from "@/components/User/Products";
import SeeCarts from "./SeeCarts";
import SeeOrderStatus from "./SeeOrderStatus";
import { useRouter, useSearchParams } from "next/navigation";
import UserProfile from "./UserProfile";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      switch (tab) {
        case "products":
          setActiveTab(0);
          break;
        case "profile":
          setActiveTab(1);
          break;
        case "cart":
          setActiveTab(2);
          break;
        case "orderstatus":
          setActiveTab(3);
          break;
        default:
          setActiveTab(0);
      }
    }
  }, [searchParams]);

  const handleClick = (tab: number, tabName: string) => {
    setActiveTab(tab);
    router.push(`/user/userdashboard?tab=${tabName}`);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="w-72 bg-gray-900 text-white p-6 shadow-xl border-r border-gray-700">
        <h2 className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
          User Dashboard
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
              onClick={() => handleClick(0, "products")}
            >
              <span className="ml-2">Browse Products</span>
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
              onClick={() => handleClick(1, "profile")}
            >
              <span className="ml-2">My Profile</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`flex items-center p-3 rounded-lg transition-all duration-300 ease-in-out
                ${
                  activeTab === 2
                    ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border-l-4 border-blue-400"
                    : "hover:bg-gray-800/50 text-gray-300 hover:text-white"
                }`}
              onClick={() => handleClick(2, "cart")}
            >
              <span className="ml-2">My Cart</span>
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
              onClick={() => handleClick(3, "orderstatus")}
            >
              <span className="ml-2">Order status</span>
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-900/95 overflow-auto">
        <div className="backdrop-blur-sm bg-white/5 rounded-xl shadow-2xl border border-gray-700/50 p-6">
          {activeTab === 0 && (
            <div className="animate-fadeIn">
              <Products />
            </div>
          )}

          {activeTab === 1 && (
            <div className="animate-fadeIn">
              <UserProfile />
            </div>
          )}

          {activeTab === 2 && (
            <div className="animate-fadeIn">
              <SeeCarts />
            </div>
          )}

          {activeTab === 3 && (
            <div className="animate-fadeIn">
              <SeeOrderStatus />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
