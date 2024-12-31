import { protectedApi } from "@/lib/api";
import { useState } from "react";
import { Product } from "../type";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";

interface SetOrderModalProps {
  product?: Product;
  onSuccess?: () => void;
}

interface ShippingAddress {
  addressLine1: string;
  country: string;
  state: string;
  city: string;
  phone: number;
  email: string;
  zipCode: number;
}

interface OrderData {
  shippingAddress: ShippingAddress;
  payment: {
    method: string;
  };
  note: string;
}

const SetOrderModal = (props: SetOrderModalProps) => {
  const [showDialog, setShowDialog] = useState(false);
  const [orderData, setOrderData] = useState<OrderData>({
    shippingAddress: {
      addressLine1: "",
      country: "Nepal",
      state: "",
      city: "",
      phone: 0,
      email: "",
      zipCode: 0,
    },
    payment: {
      method: "cod",
    },
    note: "",
  });

  const handleOrderUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (orderData.shippingAddress.phone.toString().length < 10) {
      alert("Please enter a valid phone number");
      return;
    }

    if (!orderData.shippingAddress.email.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }

    protectedApi
      .post("/orders/", orderData)
      .then(() => {
        setShowDialog(false);
        props.onSuccess?.();
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        alert("Error Placing the Order");
      });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("shipping.")) {
      const field = name.split(".")[1];
      setOrderData((prev) => ({
        ...prev,
        shippingAddress: {
          ...prev.shippingAddress,
          [field]:
            field === "phone" || field === "zipCode"
              ? parseInt(value) || 0
              : value,
        },
      }));
    } else {
      setOrderData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
      <AlertDialogTrigger asChild>
        <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30transform hover:-translate-y-0.5 focus:outline-none mt-4 relative overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
            />
          </svg>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-700">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold text-white">
            Place Order
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400">
            Please fill in your shipping details
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={handleOrderUpdate} className="space-y-6">
          <div className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="addressLine1"
                className="text-sm font-medium text-gray-300"
              >
                Address
              </label>
              <input
                id="addressLine1"
                name="shipping.addressLine1"
                value={orderData.shippingAddress.addressLine1}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500focus:border-transparent transition duration-200"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="city"
                  className="text-sm font-medium text-gray-300"
                >
                  City
                </label>
                <input
                  id="city"
                  name="shipping.city"
                  value={orderData.shippingAddress.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500focus:border-transparent transition duration-200"
                  required
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="state"
                  className="text-sm font-medium text-gray-300"
                >
                  State
                </label>
                <input
                  id="state"
                  name="shipping.state"
                  value={orderData.shippingAddress.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500focus:border-transparent transition duration-200"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-300"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  name="shipping.phone"
                  type="tel"
                  value={orderData.shippingAddress.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500focus:border-transparent transition duration-200"
                  required
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="zipcode"
                  className="text-sm font-medium text-gray-300"
                >
                  Zip Code
                </label>
                <input
                  id="phone"
                  name="shipping.zipCode"
                  type="tel"
                  value={orderData.shippingAddress.zipCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500focus:border-transparent transition duration-200"
                  required
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-300"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="shipping.email"
                  type="email"
                  value={orderData.shippingAddress.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500focus:border-transparent transition duration-200"
                  required
                />
              </div>
            </div>
          </div>

          <AlertDialogFooter className="space-x-4">
            <AlertDialogCancel
              className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600
                                      transition duration-200"
            >
              Cancel
            </AlertDialogCancel>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold hover:from-blue-600 hover:to-blue-700transform hover:-translate-y-0.5 transition-all duration-200focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Confirm Order
            </button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SetOrderModal;
