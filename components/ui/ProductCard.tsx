import React from "react";
import Image from "next/image";
import { Product } from "@/components/type";
import AddToCartModal from "@/components/AddToCartModal";
import parse from "html-react-parser";
import noImage from "@/public/NoImage.jpg";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const renderStars = () => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          className={`w-5 h-5 transition-colors duration-300 ${
            index < Math.floor(4.5) ? "text-amber-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ));
  };

  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl blur opacity-30  transition duration-1000 "></div>

      <div className="card relative w-[450px] h-[720px] bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 rounded-3xl shadow-2xl overflow-hidden p-6 border border-gray-800">
        <div className="relative z-10 text-white flex flex-col h-full gap-4">
          <h1 className="text-2xl font-bold tracking-tight text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300 text-transform capitalize">
            {product.title}
          </h1>

          <div className="relative w-full h-[280px] rounded-2xl overflow-hidden shadow-lg group-hover:shadow-purple-500/20 transition-all duration-300 group-hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10"></div>
            {product.pictures && product.pictures.length > 0 ? (
              <Image
                src={product?.pictures[0]?.imgurUrl}
                alt={product.title}
                fill
                className="object-contain"
              />
            ) : (
              <Image
                src={noImage.src}
                alt={product.title}
                fill
                className="object-contain"
              />
            )}
          </div>

          <div className="flex justify-center items-center space-x-3 bg-gray-800/50 py-2 rounded-xl backdrop-blur-sm">
            <div className="flex items-center space-x-1">{renderStars()}</div>
            <div className="w-px h-4 bg-gray-700"></div>
            <p className="text-sm font-medium text-gray-300">
              4.5<span className="text-gray-500">/5 stars</span>
            </p>
          </div>

          <div className="flex justify-center items-center space-x-4">
            <div className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20">
              <span className="line-through text-red-400/70 font-medium">
                NPR {product.price}
              </span>
            </div>
            {product.discountedPrice && (
              <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <span className="text-emerald-400 font-medium">
                  NPR {product.discountedPrice}
                </span>
              </div>
            )}
          </div>

          <div className="flex-1 h-[300px] bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 overflow-y-auto scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-purple-500 border border-gray-800/50">
            <div className="prose prose-sm prose-invert max-w-none">
              {parse(product.description)}
            </div>
          </div>

          <div className="mt-auto pt-4 flex items-center justify-center">
            <AddToCartModal product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
