import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Image from "next/image";
import { protectedApi } from "@/lib/api";
import { Button } from "@/components/ui/Button";

export interface ImageData {
  imgurUrl: string;
  altText: string;
  _id: string;
}

type Props = {
  onImageSelect: (image: ImageData) => void;
  onImageConfirm: (image: ImageData) => void;
};

const ImageSelectionModal = (props: Props) => {
  const [showDialog, setShowDialog] = useState(false);
  const [images, setImages] = useState<ImageData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);

  useEffect(() => {
    protectedApi
      .get(`/images?page=${currentPage}`)
      .then((response) => {
        const imageData = Array.isArray(response.data.images)
          ? response.data.images
          : [];
        setImages(imageData);
        setTotalPages(response.data.pagination.totalPages || 1);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        setImages([]);
      });
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    } else if (newPage < 1) {
      setCurrentPage(1);
    } else {
      setCurrentPage(totalPages);
    }
  };

  const handleSelectImage = (image: ImageData) => {
    props.onImageSelect(image);
    setSelectedImage(image);
    props.onImageConfirm(image);
  };

  return (
    <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
      <AlertDialogTrigger asChild>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 shadow-md">
          Select Product Image
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[90vw] max-w-[800px] p-8 rounded-2xl shadow-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-y-auto max-h-[90vh]">
        <div className="space-y-6">
          <div>
            <AlertDialogTitle className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Image Gallery
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 dark:text-gray-300">
              Browse and select the perfect image for your product
            </AlertDialogDescription>
          </div>

          {selectedImage && (
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-inner">
              <p className="text-lg font-semibold mb-3 text-gray-700 dark:text-white">
                Selected Image:
              </p>
              <div className="flex flex-col items-center">
                <Image
                  src={selectedImage.imgurUrl}
                  alt={selectedImage.altText}
                  width={250}
                  height={250}
                  className="rounded-xl shadow-lg object-contain max-h-64 mb-3"
                />
                <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  {selectedImage.altText}
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {images.map((image) => (
              <div
                key={image._id}
                className="group relative bg-gray-100 dark:bg-gray-700 rounded-xl p-3 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative overflow-hidden rounded-lg mb-3">
                  <Image
                    src={image.imgurUrl}
                    alt={image.altText}
                    width={250}
                    height={250}
                    className="w-full h-48 object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 text-center truncate">
                  {image.altText}
                </p>
                <button
                  onClick={() => handleSelectImage(image)}
                  className="w-full bg-blue-500 text-white py-2 rounded-full text-sm hover:bg-blue-600 transition-colors duration-300 opacity-0 group-hover:opacity-100"
                >
                  Select Image
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-6">
            <AlertDialogAction
              onClick={() => {
                if (selectedImage) {
                  setShowDialog(false);
                }
              }}
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300 shadow-md"
            >
              Confirm Selection
            </AlertDialogAction>
            <AlertDialogCancel className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-300">
              Cancel
            </AlertDialogCancel>
          </div>

          <Pagination className="flex justify-center space-x-2">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    onClick={() => handlePageChange(i + 1)}
                    isActive={currentPage === i + 1}
                    className={`px-3 py-1 rounded-md transition-colors ${
                      currentPage === i + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <Button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Next
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ImageSelectionModal;
