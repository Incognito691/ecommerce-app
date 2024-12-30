// import { Product } from "@/components/type";
import SetOrderModal from "@/components/SetOrderModal";
import { useSeeCartsQuery } from "@/app/features/api/apiSlice";
import { Loader } from "../ui/Loader";

// interface CartItems {
//   product: Product;
//   quantity: number;
//   _id: string;
// }

const SeeCarts = () => {
  // const [cartItems, setCartItems] = useState<CartItems[]>([]);
  // const [products, setProducts] = useState<Product[]>([]);

  // useEffect(() => {
  //   protectedApi
  //     .get("/products")
  //     .then((response) => setProducts(response.data.products))
  //     .catch((error) => console.error(error));
  // }, []);

  const { data: cartData, isLoading, error } = useSeeCartsQuery();

  const cartItems = cartData?.items || [];

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );

  if (error) {
    return <div className="text-red-500">Error loading cart items</div>;
  }
  // useEffect(() => {
  //   protectedApi
  //     .get("/cart")
  //     .then((response) => setCartItems(response.data.items))
  //     .catch((error) => console.error(error));
  // }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Your Cart</h1>
        <SetOrderModal />
      </div>

      <div className="grid grid-cols-3 gap-6">
        {cartItems?.map(
          (item) =>
            item.product && (
              <div
                key={item._id}
                className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl s
                      border border-gray-700/50 p-4 flex items-center justify-between"
              >
                <div className="flex-1 ">
                  <h2 className="text-xl font-semibold text-white mb-2">
                    {item.product.title}
                  </h2>
                  <p className="text-gray-300">
                    Price: NPR {item.product.discountedPrice}
                  </p>
                  <p className="text-blue-400">Quantity: {item.quantity}</p>
                  <p className="text-emerald-400">
                    Subtotal: NPR{" "}
                    {(item.product?.discountedPrice ?? 0) * item.quantity}
                  </p>
                </div>
              </div>
            )
        )}
      </div>

      {cartItems && cartItems.length > 0 && (
        <div className="mt-6 p-4 bg-gray-900/50 rounded-lg">
          <p className="text-xl font-bold text-white">
            Total: NPR{" "}
            {cartItems.reduce(
              (total, item) =>
                total +
                (item.product
                  ? (item.product?.discountedPrice ?? 0) * item.quantity
                  : 0),
              0
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default SeeCarts;
