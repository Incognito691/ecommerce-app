"use client";

import { protectedApi } from "@/lib/api";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const authenticate = async () => {
  //     const response = await protectedApi.get("/auth/me/");
  //     if (response) {
  //       setIsAuthenticated(true);
  //       setLoading(false);
  //     } else {
  //       router.push("/login");
  //       setLoading(false);
  //     }
  //   };

  //   authenticate();
  // }, [router]);

  useEffect(() => {
    protectedApi
      .get("/auth/me/")
      .then((response) => {
        console.log("Authentication successful:", response.data);
        setIsAuthenticated(true);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Authentication error:", error);
        router.push("/login");
        setLoading(false);
      });
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative w-24 h-24">
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-gray-200 dark:border-gray-700"></div>
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-blue-500 border-t-transparent animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-medium text-gray-600 dark:text-gray-300">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
};

export default Layout;
