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
