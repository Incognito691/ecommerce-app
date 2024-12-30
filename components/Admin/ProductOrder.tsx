import DeleteOrdersModal from "../DeleteOrdersModal";
import {
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
} from "@/app/features/api/apiSlice";
import { Loader } from "../ui/Loader";

// interface User {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   role: string;
//   createdAt: string;
//   updatedAt: string;
// }

// interface Item {
//   product: string;
//   quantity: number;
//   price: number;
//   _id: string;
// }

// interface ShippingAddress {
//   addressLine1: string;
//   country: string;
//   state: string;
//   city: string;
//   phone: number;
//   email: string;
//   zipCode: number;
// }

// interface Order {
//   _id: string;
//   user: User;
//   items: Item[];
//   totalAmount: number;
//   status: string;
//   createdAt: string;
//   shippingAddress: ShippingAddress;
// }

const ProductOrder = () => {
  const { data: ordersData, isLoading, error } = useGetOrdersQuery();
  const orders = ordersData?.orders || [];
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  // const [orders, setOrders] = useState<Order[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
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
  // }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      // Log the attempt
      console.log("Attempting to update status:", { orderId, newStatus });

      const result = await updateOrderStatus({
        orderId,
        status: newStatus,
      }).unwrap();

      console.log("Update successful:", result);
    } catch (error: any) {
      console.error("Failed to update order status:", {
        error: error?.data || error?.message || error,
        status: error?.status,
        orderId,
        newStatus,
      });
    }
  };

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (error) return <div className="text-red-500">Error: Loading orders</div>;

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="max-w-8xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-8 text-gray-800 dark:text-gray-100 tracking-tight">
          Orders Management
          <div className="h-1 w-20 bg-blue-500 mt-2 rounded-full"></div>
        </h2>

        <div className="mt-8">
          {orders.length === 0 ? (
            <div className="text-center p-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <p className="text-lg text-gray-600 dark:text-gray-400">
                No orders found
              </p>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-700/50">
                      <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300 text-left">
                        Order ID
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300 text-left">
                        Customer
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300 text-left">
                        Items
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300 text-left">
                        Total Amount
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300 text-left">
                        Status
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300 text-left">
                        Date
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300 text-left">
                        Shipping Address
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300 text-left">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {orders.map((order) => (
                      <tr
                        key={order._id}
                        className="group hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                      >
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {order._id}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {order.user.firstName} {order.user.lastName}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-2">
                            {order.items.map((item) => (
                              <div
                                key={item._id}
                                className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg text-sm"
                              >
                                <div className="font-medium text-gray-900 dark:text-gray-100">
                                  Product ID: {item.product}
                                </div>
                                <div className="text-gray-600 dark:text-gray-400 mt-1">
                                  Quantity: {item.quantity}
                                </div>
                                <div className="text-blue-600 dark:text-blue-400 font-medium mt-1">
                                  NPR {item.price}
                                </div>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            NPR {order.totalAmount}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleStatusChange(order._id, e.target.value)
                            }
                            className="px-3 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                          >
                            <option value="pending">Pending</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                            <div className="text-sm space-y-1">
                              <p className="text-gray-900 dark:text-gray-100">
                                {order.shippingAddress.addressLine1}
                              </p>
                              <p className="text-gray-600 dark:text-gray-400">
                                {order.shippingAddress.city},{" "}
                                {order.shippingAddress.state}
                              </p>
                              <p className="text-gray-600 dark:text-gray-400">
                                {order.shippingAddress.zipCode},{" "}
                                {order.shippingAddress.country}
                              </p>
                              <p className="text-gray-600 dark:text-gray-400">
                                {order.shippingAddress.phone}
                              </p>
                              <p className="text-blue-600 dark:text-blue-400">
                                {order.shippingAddress.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center">
                            <DeleteOrdersModal
                              order={order}
                              onSuccess={() =>
                                console.log("Order deleted successfully")
                              }
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductOrder;
