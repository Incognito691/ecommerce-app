"use client";

import React, { useEffect, useState } from "react";
import Editor from "react-simple-wysiwyg";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { protectedApi } from "@/lib/api";
import ImageSelectionModal from "./ImageSelectionModal";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { useEditProductMutation } from "@/app/features/api/ProductsApi";
import { ImageType, Product } from "../type";

interface EditProductProps {
  product: Product;
  onSuccess: (updatedProduct: Product) => void;
}

const EditProductModal = (props: EditProductProps) => {
  const [showDialog, setShowDialog] = useState(false);
  const [editedProduct, setEditedProduct] = useState<Product>(props.product);
  const [images, setImages] = useState<ImageType[]>([]);
  const [confirmedImage, setConfirmedImage] = useState<ImageType | null>(null);

  const [editProduct] = useEditProductMutation();

  useEffect(() => {
    if (showDialog) {
      protectedApi
        .get("/images")
        .then((response) => {
          const imageData = Array.isArray(response.data.images)
            ? response.data.images
            : [];
          setImages(imageData);
        })
        .catch((error) => {
          console.error("Error fetching images:", error);
          setImages([]);
        });
    }
  }, [showDialog]);

  const handleEditUpdate = async () => {
    try {
      await editProduct({
        _id: props.product._id,
        title: editedProduct.title,
        description: editedProduct.description,
        price: editedProduct.price,
        discountedPrice: editedProduct.discountedPrice,
        image: images[0]?.imgurUrl,
        imageId: images[0]?._id,
      });
      props.onSuccess(editedProduct);
    } catch (error) {
      console.error("Error updating product:", error);
    }
    setShowDialog(false);
  };

  return (
    <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
      <AlertDialogTrigger asChild>
        <button
          className="w-full max-w-[60px] aspect-square bg-gradient-to-br from-blue-500 to-blue-600 
          text-white font-semibold rounded-xl transition-all duration-300 
          hover:shadow-xl hover:shadow-blue-500/30 group
          flex items-center justify-center
          focus:outline-none focus:ring-4 focus:ring-blue-500/50"
        >
          <Pencil className="w-6 h-6 transition-transform group-hover:rotate-6 group-active:scale-90" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent
        className="w-[95%] max-w-4xl mx-auto bg-white dark:bg-gray-900 
        rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 
        overflow-hidden p-6 space-y-6 max-h-[90vh] overflow-y-auto"
      >
        <AlertDialogHeader>
          <AlertDialogTitle
            className="text-3xl font-bold text-center 
            text-gray-800 dark:text-white 
            bg-gradient-to-r from-blue-500 to-indigo-600 
            bg-clip-text text-transparent"
          >
            Edit Product
          </AlertDialogTitle>
          <AlertDialogDescription
            className="text-center text-gray-600 dark:text-gray-400 
            text-sm mt-2"
          >
            Make changes to the product details. Click save when you are done.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEditUpdate();
          }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <div>
              {editedProduct?.pictures?.[0]?.imgurUrl && (
                <div className="flex justify-center mb-4">
                  <Image
                    src={editedProduct?.pictures?.[0]?.imgurUrl}
                    alt={editedProduct?.pictures?.[0]?.altText}
                    width={200}
                    height={200}
                    className="rounded-lg object-contain"
                  />
                </div>
              )}
            </div>
            {confirmedImage && (
              <div className="flex justify-center mb-4">
                <Image
                  src={confirmedImage.imgurUrl}
                  alt={confirmedImage.altText}
                  width={200}
                  height={200}
                  className="rounded-lg object-contain"
                />
              </div>
            )}
            <div className="flex flex-col justify-end">
              <ImageSelectionModal
                onImageSelect={(image: ImageType) => setImages([image])}
                onImageConfirm={(image: ImageType) => setConfirmedImage(image)}
              />
            </div>

            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                value={editedProduct.title}
                onChange={(e) =>
                  setEditedProduct((pre) => ({ ...pre, title: e.target.value }))
                }
                className="w-full px-4 py-2.5 rounded-lg 
                bg-gray-100 dark:bg-gray-800 
                text-gray-800 dark:text-gray-100
                border border-gray-300 dark:border-gray-700
                focus:outline-none focus:ring-2 focus:ring-blue-500
                transition-all duration-300"
                required
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Price
              </label>
              <input
                id="price"
                type="number"
                value={editedProduct.price}
                onChange={(e) =>
                  setEditedProduct((pre) => ({
                    ...pre,
                    price: parseFloat(e.target.value),
                  }))
                }
                className="w-full px-4 py-2.5 rounded-lg 
                bg-gray-100 dark:bg-gray-800 
                text-gray-800 dark:text-gray-100
                border border-gray-300 dark:border-gray-700
                focus:outline-none focus:ring-2 focus:ring-blue-500
                transition-all duration-300"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Description
            </label>
            <Editor
              id="description"
              value={editedProduct.description}
              onChange={(e) =>
                setEditedProduct((pre) => ({
                  ...pre,
                  description: e.target.value,
                }))
              }
              className="w-full rounded-lg 
              bg-gray-100 dark:bg-gray-800 
              text-gray-800 dark:text-gray-100
              border border-gray-300 dark:border-gray-700
              focus:outline-none focus:ring-2 focus:ring-blue-500
              transition-all duration-300 editor"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="discountedPrice"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Discounted Price (Optional)
              </label>
              <input
                id="discountedPrice"
                type="number"
                value={editedProduct.discountedPrice || ""}
                onChange={(e) =>
                  setEditedProduct((pre) => ({
                    ...pre,
                    discountedPrice: e.target.value
                      ? parseFloat(e.target.value)
                      : undefined,
                  }))
                }
                className="w-full px-4 py-2.5 rounded-lg 
                bg-gray-100 dark:bg-gray-800 
                text-gray-800 dark:text-gray-100
                border border-gray-300 dark:border-gray-700
                focus:outline-none focus:ring-2 focus:ring-blue-500
                transition-all duration-300"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-800">
            <button
              type="button"
              onClick={() => setShowDialog(false)}
              className="px-6 py-3 rounded-lg text-sm font-medium
              bg-gray-100 dark:bg-gray-800 
              text-gray-700 dark:text-gray-300
              hover:bg-gray-200 dark:hover:bg-gray-700
              focus:outline-none focus:ring-2 focus:ring-gray-500
              transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-lg text-sm font-medium
              bg-gradient-to-r from-blue-500 to-indigo-600
              text-white 
              hover:from-blue-600 hover:to-indigo-700
              focus:outline-none focus:ring-2 focus:ring-blue-500
              focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900
              transition-all duration-300 
              transform hover:scale-[1.02] active:scale-100
              shadow-md hover:shadow-lg shadow-blue-500/30"
            >
              Save Changes
            </button>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditProductModal;
