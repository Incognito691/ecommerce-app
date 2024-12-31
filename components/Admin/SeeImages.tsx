import React, { useState, useEffect } from "react";
import Image from "next/image";
import DeleteImageModal from "@/components/Modal/DeleteImageModal";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Loader } from "@/components/ui/Loader";
import { ImageResponse, ImageType } from "../type";

interface Props {
  images: ImageResponse | undefined;
  isLoading: boolean;
  refetch: () => void;
  currentPage: string;
}

const SeeImages = ({ images, isLoading, refetch, currentPage }: Props) => {
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();
  const productsPerPage = 12;

  useEffect(() => {
    if (images) {
      setTotalPages(Math.ceil(images.images.length / productsPerPage));
    }
  }, [images]);

  const handlePageChange = (page: number) => {
    router.push(`/admin/admindashboard?tab=imageupload&page=${page}`);
  };

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );
  console.log(images);
  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800 dark:text-white border-b pb-3 border-gray-200 dark:border-gray-700">
        Posted Images
      </h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images?.images?.map((image: ImageType) => (
          <div
            key={image._id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden flex flex-col"
          >
            <div className="relative w-full pt-[75%]">
              <Image
                src={image.imgurUrl}
                alt={image.altText}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={true}
                className="absolute inset-0 object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 flex-grow flex flex-col justify-between">
              <p
                className="text-sm text-gray-600 dark:text-gray-300 
                        mb-4 truncate"
              >
                Image: {image.altText}
              </p>
              <div
                className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 
                          flex justify-center"
              >
                <DeleteImageModal
                  images={image}
                  onSuccess={() => {
                    refetch();
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination className="mt-8 cursor-pointer flex justify-center">
        <PaginationContent className="inline-flex items-center space-x-2">
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(parseInt(currentPage) - 1)}
              className="px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                onClick={() => handlePageChange(i + 1)}
                isActive={currentPage === `${i + 1}`}
                className={`px-4 py-2 rounded-md 
                        transition-colors duration-300 
                        ${
                          currentPage === `${i + 1}`
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                        }`}
              >
                {currentPage}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(parseInt(currentPage) + 1)}
              className="px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default SeeImages;
