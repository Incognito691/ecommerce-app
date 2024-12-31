import { protectedApi } from "@/lib/api";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import AddToCartBtn from "../ui/AddToCartBtn";
import { useAddCartMutation } from "@/app/features/api/CartApi";
import { Product } from "../type";

interface AddToCartModalProps {
  product: Product;
}

const AddToCartModal = ({ product }: AddToCartModalProps) => {
  const [showDialog, setShowDialog] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const [addCart, { isLoading }] = useAddCartMutation();

  const handleCartUpdate = () => {
    addCart({ productId: product._id, quantity: quantity })
      .unwrap()
      .then(() => {
        setShowDialog(false);
        setQuantity(1);
      })
      .catch((error) => console.error("Error adding to cart:", error));
  };

  return (
    <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
      <AlertDialogTrigger asChild>
        <AddToCartBtn />
      </AlertDialogTrigger>

      <AlertDialogContent
        className="w-[95%] max-w-md mx-auto bg-white dark:bg-gray-900 
        rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 
        overflow-hidden p-6"
      >
        <AlertDialogHeader className="space-y-4">
          <AlertDialogTitle
            className="text-3xl font-bold text-center 
            text-gray-800 dark:text-white 
            bg-gradient-to-r from-emerald-500 to-teal-600 
            bg-clip-text text-transparent"
          >
            Add To Cart
          </AlertDialogTitle>

          <div className="text-center space-y-6">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Select the quantity you want to add to your cart
            </p>

            <div className="flex items-center justify-center space-x-6">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 
                text-gray-700 dark:text-gray-300 
                hover:bg-gray-200 dark:hover:bg-gray-700 
                transition-all duration-300 
                flex items-center justify-center text-2xl 
                focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                -
              </button>
              <span
                className="text-2xl font-semibold text-gray-800 dark:text-white 
                min-w-[4rem] text-center"
              >
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 
                text-gray-700 dark:text-gray-300 
                hover:bg-gray-200 dark:hover:bg-gray-700 
                transition-all duration-300 
                flex items-center justify-center text-2xl 
                focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                +
              </button>
            </div>
          </div>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-8 flex space-x-4">
          <AlertDialogCancel asChild>
            <button
              className="flex-1 px-6 py-3 rounded-lg 
              bg-gray-100 dark:bg-gray-800 
              text-gray-700 dark:text-gray-300 
              hover:bg-gray-200 dark:hover:bg-gray-700 
              transition-all duration-300 
              font-medium text-sm 
              focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </AlertDialogCancel>

          <button
            onClick={handleCartUpdate}
            className="flex-1 px-6 py-3 rounded-lg 
            bg-gradient-to-r from-emerald-500 to-teal-600 
            text-white 
            hover:from-emerald-600 hover:to-teal-700 
            transition-all duration-300 
            font-medium text-sm 
            shadow-md hover:shadow-lg 
            shadow-emerald-500/30 hover:shadow-emerald-500/40 
            focus:outline-none focus:ring-2 focus:ring-emerald-500 
            transform hover:scale-[1.02] active:scale-100"
          >
            Add to Cart
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddToCartModal;
