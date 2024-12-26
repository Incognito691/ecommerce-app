"use client";

import React, { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "../ui/ProductCard";
import { useGetProductsQuery } from "@/app/features/api/apiSlice";
import { Loader } from "../ui/Loader";

const Products = () => {
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") || "1";
  const productsPerPage = 12;

  const { data, isLoading } = useGetProductsQuery({
    page: currentPage,
    limit: productsPerPage.toString(),
  });

  useEffect(() => {
    if (data) {
      setTotalPages(Math.ceil(data.totalCount / productsPerPage));
    }
  }, [data]);

  const handlePageChange = (page: number) => {
    router.push(`/user/userdashboard?tab=products&page=${page}`);
  };

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8 max-h-[80vh] overflow-y-auto bg-gray-950/50 backdrop-blur-sm">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
        {data?.products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <Pagination className="mt-8 cursor-pointer">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(parseInt(currentPage) - 1)}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                onClick={() => handlePageChange(i + 1)}
                isActive={currentPage === `${i + 1}`}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(parseInt(currentPage) + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Products;
