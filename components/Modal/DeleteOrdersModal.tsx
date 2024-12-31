import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogTrigger,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { useDeleteOrderMutation } from "@/app/features/api/OrderApi";
import { Order } from "@/components/type";

const DeleteOrdersModal = (props: { order: Order; onSuccess: () => void }) => {
  const [showDialog, setShowDialog] = useState(false);

  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();

  const handleDeleteUpdate = async () => {
    try {
      await deleteOrder(props.order._id).unwrap();
      props.onSuccess?.();
      setShowDialog(false);
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
      <AlertDialogTrigger asChild>
        <button
          className="w-full bg-red-600 text-white font-semibold 
                         py-2.5 px-4 rounded-lg transition-all duration-300 
                         hover:bg-red-700 
                         focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                         active:scale-95 
                         flex items-center justify-center gap-2
                         shadow-md hover:shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-full max-w-md rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl dark:shadow-red-500/10 p-6 space-y-6">
        <AlertDialogHeader className="space-y-2">
          <AlertDialogTitle
            className="text-2xl font-bold text-gray-900 dark:text-white 
                           bg-clip-text text-transparent 
                           bg-gradient-to-r from-red-600 to-red-800"
          >
            Delete Order
          </AlertDialogTitle>
          <AlertDialogDescription
            className="text-gray-600 dark:text-gray-400 
                           text-base leading-relaxed"
          >
            Are you sure you want to permanently delete this Order? This action
            cannot be undone and will remove the Order from your inventory.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg border border-red-100 dark:border-red-900/50">
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-red-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
            <p className="text-red-700 dark:text-red-300 text-sm">
              This will permanently delete the order from all records.
            </p>
          </div>
        </div>

        <AlertDialogFooter className="flex space-x-4">
          <AlertDialogCancel asChild>
            <button
              type="button"
              className="flex-1 py-2.5 rounded-lg 
                             bg-gray-100 dark:bg-gray-800 
                             text-gray-700 dark:text-gray-300 
                             hover:bg-gray-200 dark:hover:bg-gray-700 
                             focus:outline-none focus:ring-2 focus:ring-gray-500 
                             transition-all duration-300"
            >
              Cancel
            </button>
          </AlertDialogCancel>

          <button
            type="button"
            onClick={handleDeleteUpdate}
            disabled={isDeleting}
            className="flex-1 py-2 rounded-lg 
                           bg-red-600 text-white 
                           hover:bg-red-700 
                           focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                           transition-all duration-300 
                           disabled:opacity-50 disabled:cursor-not-allowed
                           flex items-center justify-center gap-2"
          >
            {isDeleting ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Deleting...
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5  "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
                Delete
              </>
            )}
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteOrdersModal;
