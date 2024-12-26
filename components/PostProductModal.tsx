import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

const PostProductModal = () => {
  const [showDialog, setShowDialog] = React.useState(false);

  return (
    <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
      <AlertDialogTrigger>
        <button
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg
                     transition-all duration-300 transform hover:-translate-y-1 
                     shadow-lg hover:shadow-blue-500/20 border border-blue-500"
        >
          Post Product
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-gray-800 border border-gray-700">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">
            Posted Successfully
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-300">
            The product has been posted successfully. You can check it on the
            Product Lists.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-green-700 text-white hover:bg-green-600">
            Okay{" "}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PostProductModal;
