import DeleteOrdersModal from "../Modal/DeleteOrdersModal";
import {
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
} from "@/app/features/api/OrderApi";
import { Loader } from "../ui/Loader";

const ProductOrder = () => {
  const { data: ordersData, isLoading, error } = useGetOrdersQuery();
  const orders = ordersData?.orders || [];
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
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
    <div className="p-6 mx-auto bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h2 className="text-4xl font-extrabold mb-8 text-gray-800 dark:text-gray-100 tracking-wide">
        Orders Management
        <div className="h-1 w-20 bg-blue-500 mt-2 rounded-full"></div>
      </h2>

      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700 w-full overflow-x-auto">
        {orders.length === 0 ? (
          <div className="text-center p-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              No orders found
            </p>
          </div>
        ) : (
          <div className="min-w-[500px]">
            <table className="w-full">
              <thead className="bg-gray-200 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600">
                <tr className="bg-gray-50 dark:bg-gray-700/50">
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300 text-left">
                    Order ID
                  </th>
                  <th className="px-4 py-3  text-sm font-bold uppercase text-gray-700 dark:text-gray-300 text-center">
                    Customer
                  </th>
                  <th className="px-4 py-3  text-sm font-bold uppercase text-gray-700 dark:text-gray-300 text-center">
                    Items
                  </th>

                  <th className="px-4 py-3  text-sm font-bold uppercase text-gray-700 dark:text-gray-300 text-center">
                    Status
                  </th>
                  <th className="px-4 py-3  text-sm font-bold uppercase text-gray-700 dark:text-gray-300 text-center">
                    Date
                  </th>
                  <th className="px-4 py-3  text-sm font-bold uppercase text-gray-700 dark:text-gray-300 text-center">
                    Shipping Address
                  </th>
                  <th className="px-4 py-3  text-sm font-bold uppercase text-gray-700 dark:text-gray-300 text-center">
                    Actions
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
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {order.user.firstName} {order.user.lastName}
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
        )}
      </div>
    </div>
  );
};

export default ProductOrder;
