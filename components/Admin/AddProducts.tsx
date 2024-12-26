"use client";

import React, { useState } from "react";
import Editor, { ContentEditableEvent } from "react-simple-wysiwyg";
import Backbtn from "../ui/backbtn";
import { usePostProductMutation } from "@/app/features/api/apiSlice";

const AddProducts = () => {
  const [products, setProducts] = useState<{
    title: string;
    description: string;
    price: number;
    discountedPrice?: number;
  }>({
    title: "",
    description: "",
    price: 0,
    discountedPrice: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [postProduct] = usePostProductMutation();

  const handleAddProduct: React.FormEventHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (products.discountedPrice && products.discountedPrice > products.price) {
      setError("Discounted price cannot be greater than the original price.");
      setIsSubmitting(false);
      return;
    }

    try {
      await postProduct(products).unwrap();
      setProducts({
        title: "",
        description: "",
        price: 0,
        discountedPrice: undefined,
      });
    } catch (err) {
      console.error(err);
      setError("Failed to post the product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <Backbtn />
      <div className="flex justify-center mt-8 animate-fade-in">
        <form
          onSubmit={handleAddProduct}
          className="w-full max-w-2xl bg-gray-800/80 p-8 rounded-2xl shadow-2xl border border-gray-700/50 transform transition-all duration-500"
        >
          <h2 className="text-3xl font-extrabold mb-6 text-white border-b-2 border-blue-500 pb-4 tracking-wider text-center drop-shadow-[0_2px_2px_rgba(59,130,246,0.3)]">
            Add New Product
          </h2>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="space-y-6">
            <div className="w-full group">
              <label
                htmlFor="title"
                className="block text-blue-300 text-sm font-bold mb-2"
              >
                TITLE
              </label>
              <input
                id="title"
                type="text"
                placeholder="Enter product title"
                value={products.title}
                onChange={(e) =>
                  setProducts({ ...products, title: e.target.value })
                }
                required
                className="w-full bg-gray-700/60 text-white border rounded-xl py-3 px-4 focus:ring-4"
              />
            </div>

            <div className="w-full group">
              <label
                htmlFor="description"
                className="block text-blue-300 text-sm font-bold mb-2"
              >
                DESCRIPTION
              </label>
              <Editor
                value={products.description}
                onChange={(event: ContentEditableEvent) =>
                  setProducts({ ...products, description: event.target.value })
                }
                className="editor text-white w-full bg-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="w-full group">
                <label
                  htmlFor="price"
                  className="block text-blue-300 text-sm font-bold mb-2"
                >
                  PRICE
                </label>
                <input
                  id="price"
                  type="number"
                  placeholder="Enter price"
                  value={products.price}
                  onChange={(e) =>
                    setProducts({
                      ...products,
                      price: parseInt(e.target.value),
                    })
                  }
                  required
                  className="w-full bg-gray-700/60 text-white border rounded-xl py-3 px-4 focus:ring-4"
                />
              </div>

              <div className="w-full group">
                <label
                  htmlFor="discountedPrice"
                  className="block text-blue-300 text-sm font-bold mb-2"
                >
                  DISCOUNTED PRICE
                </label>
                <input
                  id="discountedPrice"
                  type="number"
                  placeholder="Optional discounted price"
                  value={products.discountedPrice || ""}
                  onChange={(e) =>
                    setProducts({
                      ...products,
                      discountedPrice: e.target.value
                        ? parseInt(e.target.value)
                        : undefined,
                    })
                  }
                  className="w-full bg-gray-700/60 text-white border rounded-xl py-3 px-4 focus:ring-4"
                />
              </div>
            </div>

            <div className="flex justify-center pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl disabled:opacity-50"
              >
                {isSubmitting ? "Posting..." : "Post Product"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
