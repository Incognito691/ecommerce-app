export interface Product {
  _id: number;
  title: string;
  description: string;
  price: number;
  discountedPrice?: number | undefined;
  slug: string;
  image?: string;
  imageId?: string;
  pictures?: Images[];
}

export interface Images {
  _id: string;
  imgurUrl: string;
  altText: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Item {
  product: string;
  quantity: number;
  price: number;
  _id: string;
}

export interface Order {
  _id: string;
  user: User;
  items: Item[];
  totalAmount: number;
  status: string;
  createdAt: string;
  shippingAddress: ShippingAddress;
}

export interface CartItems {
  product: Product;
  quantity: number;
  _id: string;
}

export interface ShippingAddress {
  addressLine1: string;
  country: string;
  state: string;
  city: string;
  phone: number;
  email: string;
  zipCode: number;
}

// export interface ApiError {
//   data?: {
//     message?: string;
//     [key: string]: any;
//   };
//   status?: number;
//   message?: string;
// }

export interface UserProfileData {
  firstName: string;
  lastName: string;
  _id: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  displayPicture: {
    url: string;
    ImgurId: string;
  };
}
