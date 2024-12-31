"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import parse from "html-react-parser";
import EditProductModal from "@/components/Modal/EditProductModal";
import DeleteProductModal from "@/components/Modal/DeleteProductModal";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import AddItemBtn from "../ui/AddItemBtn";
import noImage from "@/public/NoImage.jpg";
import { useGetProductsQuery } from "@/app/features/api/ProductsApi";
import { Loader } from "../ui/Loader";

const ProductLists = () => {
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") || "1";
  const productsPerPage = 10;

  const {
    data: products,
    isLoading,
    refetch,
  } = useGetProductsQuery({
    page: currentPage,
    limit: productsPerPage.toString(),
  });

  useEffect(() => {
    if (products) {
      setTotalPages(Math.ceil(products.totalCount / productsPerPage));
    }
  }, [products]);

  const handlePageChange = (page: number) => {
    router.push(`/admin/admindashboard?tab=productlists&page=${page}`);
  };

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-950/50 max-h-[80vh] overflow-y-auto">
      {/* Header Section with Add Products Button */}
      <div className="flex justify-end mb-8">
        <Link href="/admin/admindashboard/products/addproducts">
          <AddItemBtn />
        </Link>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.products.map((product) => (
          <div
            key={product._id}
            className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-lg shadow-md border border-gray-200 p-6 flex flex-col justify-between h-full"
          >
            {/* Product Title */}
            <h2 className="text-xl font-semibold text-white mb-4 truncate text-transform capitalize">
              {product.title}
            </h2>

            {product.pictures && product.pictures.length > 0 ? (
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={product?.pictures[0]?.imgurUrl}
                  alt={product.title}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-md"
                />
              </div>
            ) : (
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={noImage}
                  alt="No Image"
                  layout="fill"
                  className="rounded-md object-contain"
                />
              </div>
            )}

            {/* Product Description */}
            <div className="text-gray-200 text-sm mb-4 editor">
              {parse(product.description)}
            </div>

            {/* Pricing Section */}
            <div className="mb-4">
              <p className="text-lg font-medium text-green-700 mb-2">
                Price: NPR {product.price}
              </p>
              {product.discountedPrice && (
                <p className="text-lg font-medium text-red-600">
                  Discounted: NPR {product.discountedPrice}
                </p>
              )}
            </div>

            {/* Action Buttons Section */}
            <div className="grid grid-cols-2 gap-4">
              <EditProductModal
                product={product}
                onSuccess={() => {
                  refetch();
                }}
              />
              <DeleteProductModal
                product={product}
                onSuccess={() => {
                  refetch();
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
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

export default ProductLists;
