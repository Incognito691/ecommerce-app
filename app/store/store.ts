import { configureStore } from "@reduxjs/toolkit";
import { ProductsApi } from "../features/api/ProductsApi";
import { ProfileApi } from "../features/api/ProfileApi";
import { OrderApi } from "../features/api/OrderApi";
import { ImageApi } from "../features/api/ImageApi";
import { CartApi } from "../features/api/CartApi";

const store = configureStore({
  reducer: {
    [ProductsApi.reducerPath]: ProductsApi.reducer,
    [ProfileApi.reducerPath]: ProfileApi.reducer,
    [OrderApi.reducerPath]: OrderApi.reducer,
    [ImageApi.reducerPath]: ImageApi.reducer,
    [CartApi.reducerPath]: CartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ProductsApi.middleware,
      ProfileApi.middleware,
      OrderApi.middleware,
      ImageApi.middleware,
      CartApi.middleware
    ),
});

export default store;
