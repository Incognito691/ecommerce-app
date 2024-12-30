"use client";

import {
  Clock,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Truck,
  ArrowRightFromLine,
} from "lucide-react";
import { useGetOrdersQuery } from "@/app/features/api/apiSlice";
import { Loader } from "../ui/Loader";

// interface User {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
// }

// interface Item {
//   product: string;
//   quantity: number;
//   price: number;
//   _id: string;
// }

// interface Order {
//   _id: string;
//   user: User;
//   items: Item[];
//   totalAmount: number;
//   status: string;
//   createdAt: string;
// }

const statuses = [
  {
    key: "pending",
    label: "Pending",
    description: "Your order is awaiting processing.",
    color: "#FFA500",
    icon: <Clock size={24} strokeWidth={2} color="#FFA500" />,
  },
  {
    key: "processing",
    label: "Processing",
    description: "Your order is being prepared.",
    color: "#61d5f9",
    icon: <RefreshCw size={24} strokeWidth={2} color="#61d5f9" />,
  },
  {
    key: "shipped",
    label: "Shipped",
    description: "Your order is on the way.",
    color: "#fb4ded",
    icon: <Truck size={24} strokeWidth={2} color="#fb4ded" />,
  },
  {
    key: "delivered",
    label: "Delivered",
    description: "Your order has been delivered.",
    color: "#1eef26",
    icon: <CheckCircle2 size={24} strokeWidth={2} color="#1eef26" />,
  },
  {
    key: "cancelled",
    label: "Cancelled",
    description: "Your order has been cancelled.",
    color: "#f21e1e",
    icon: <XCircle size={24} strokeWidth={2} color="#f21e1e" />,
  },
];

const SeeOrderStatus: React.FC = () => {
  const { data: orderData, isLoading, error } = useGetOrdersQuery();
  const orders = orderData?.orders || [];

  // const [orders, setOrders] = useState<Order[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   fetchUserOrders();
  // }, []);

  // const fetchUserOrders = () => {
  //   protectedApi
  //     .get("/orders")
  //     .then((response) => {
  //       if (Array.isArray(response.data.orders)) {
  //         setOrders(response.data.orders);
  //       } else {
  //         setError("Unexpected response format");
  //       }
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setError(error.message || "Failed to fetch orders");
  //       setLoading(false);
  //     });
  // };

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error: loading orders</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h2 className="text-4xl font-extrabold mb-6 text-gray-800 dark:text-gray-100 tracking-wide">
        Your Orders
      </h2>

      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700 overflow-x-auto">
        {orders.length === 0 ? (
          <div className="p-8 text-center text-gray-600 dark:text-gray-400">
            <p className="text-lg font-medium">No orders found</p>
          </div>
        ) : (
          <div className="min-w-max">
            <table className="w-full">
              <thead className="bg-gray-200 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-bold uppercase text-gray-700 dark:text-gray-300 text-center">
                    Order ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-bold uppercase text-gray-700 dark:text-gray-300 text-center">
                    Items
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-bold uppercase text-gray-700 dark:text-gray-300 text-center">
                    Tracking
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-300 dark:divide-gray-600">
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className="px-3 py-4 text-sm font-semibold text-gray-800 dark:text-gray-200">
                      <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded-md shadow-inner">
                        {order._id}
                      </div>
                    </td>

                    <td className="px-3 py-4">
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div
                            key={item._id}
                            className="text-sm text-gray-800 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 p-3 rounded-md shadow-sm border border-gray-300 dark:border-gray-600"
                          >
                            <div className="flex flex-col gap-1 justify-center items-center">
                              <span className="text-gray-600 dark:text-gray-400">
                                Product ID: {item.product}
                              </span>
                              <span className="text-gray-600 dark:text-gray-400">
                                Quantity: {item.quantity}
                              </span>
                              <span className=" text-gray-800 dark:text-gray-200">
                                NPR {item.price.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-2  flex items-center justify-center text-sm text-gray-800 dark:text-gray-300 bg-gray-100 dark:bg-slate-700 p-3 rounded-md shadow-sm border border-gray-300 dark:border-gray-600">
                        Total: NPR {order.totalAmount}
                      </div>
                    </td>

                    <td className="px-8 py-4">
                      <div className="flex flex-col gap-2 justify-center items-center">
                        <div className="relative flex flex-col space-y-6">
                          {statuses.map((status) => (
                            <div
                              key={status.key}
                              className="flex items-center gap-4"
                            >
                              <div
                                className="h-full w-1 bg-gray-300 dark:bg-gray-600 relative mr-4"
                                style={
                                  order.status === status.key
                                    ? { color: status.color }
                                    : { color: "gray", opacity: 0.01 }
                                }
                              >
                                <ArrowRightFromLine className="absolute top-1/2 -translate-y-1/2 " />
                              </div>

                              <div
                                style={
                                  order.status === status.key
                                    ? { color: status.color, scale: 1.5 }
                                    : { color: "gray", opacity: 0.17 }
                                }
                                //   className={`z-10 w-8 h-8 flex items-center justify-center rounded-full border-2 shadow-md ${

                                //     order.status === status.key
                                //       ? `border-${status.color}-500 bg-${status.color}-500 text-white scale-150`
                                //       : "text-gray-400 opacity-25"
                                //   }`}
                              >
                                {status.icon}
                              </div>

                              <div className="flex flex-col">
                                <div
                                  style={
                                    order.status === status.key
                                      ? { color: status.color, scale: 1 }
                                      : { color: "gray", opacity: 0.17 }
                                  }
                                  // className={`text-sm font-bold ${
                                  //   order.status === status.key
                                  //     ? `text-${status.color}-700`
                                  //     : "text-gray-400 dark:text-blue-500"
                                  // }`}
                                >
                                  {status.label}
                                </div>

                                {order.status === status.key && (
                                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                                    {status.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeeOrderStatus;
