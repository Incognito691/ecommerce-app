"use client";

import { protectedApi } from "@/lib/api";
import React, { useEffect, useState } from "react";
import SeeImages from "@/components/Admin/SeeImages";
import Image from "next/image";

interface ImageData {
  altText: string;
  tags: string[];
  albumId: string;
  image: File;
}

interface Props {
  onImageData?: (data: File | string | null) => void;
}

const AddImage: React.FC<Props> = ({ onImageData }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageData, setImageData] = useState<ImageData>({
    altText: "",
    tags: [],
    albumId: "67481bc3c7a61f4e9858bfa7",
    image: new File([], ""),
  });

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }

      const file = event.target.files[0];

      if (!file.type.startsWith("image/")) {
        alert("Please select an image file.");
      }

      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
      setSelectedImage(file);
      setImageData((prev) => ({
        ...prev,
        image: file,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageUpload: React.FormEventHandler = async (e) => {
    e.preventDefault();

    try {
      if (!selectedImage) {
        throw new Error("No file selected");
      }

      const formData = new FormData();
      console.log(formData, "sdsd");
      formData.append("image", selectedImage);
      formData.append("altText", imageData.altText);
      formData.append("tags", JSON.stringify(imageData.tags));
      formData.append("albumId", imageData.albumId);

      const response = await protectedApi.post("/images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 30000,
        validateStatus: (status) => status === 201 || status === 200,
      });

      console.log("The Response is:", response);
      onImageData?.(response.data);

      resetForm();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error uploading image:", error.message);
      } else {
        console.error("An unexpected error occurred");
      }

      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    }
  };

  const resetForm = () => {
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }
    setPreviewImage(null);
    setSelectedImage(null);
    setImageData({
      altText: "",
      tags: [],
      albumId: "67481bc3c7a61f4e9858bfa7",
      image: new File([], ""),
    });
  };

  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "tags") {
      setImageData((prev) => ({
        ...prev,
        tags: value.split(",").map((tag) => tag.trim()),
      }));
    } else {
      setImageData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <form
      className="max-w mx-auto p-6 bg-gray-700 rounded-xl shadow-md space-y-6"
      onSubmit={handleImageUpload}
    >
      <div className="space-y-2">
        <label className="block text-blue-400 text-sm font-semibold mb-2">
          UPLOAD IMAGE
        </label>
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            {previewImage ? (
              <div className="w-full h-full relative">
                <Image
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-full object-contain p-2"
                  width={200}
                  height={200}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <p className="text-white text-sm">Click to change image</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
            )}
            <input
              type="file"
              className="hidden"
              onChange={handleImageSelect}
              accept="image/*"
            />
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-blue-400 text-sm font-semibold mb-2">
            Alt Text
          </label>
          <input
            type="text"
            name="altText"
            value={imageData.altText}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Enter alt text for the image"
          />
        </div>

        <div>
          <label className="block text-blue-400 text-sm font-semibold mb-2">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            name="tags"
            value={imageData.tags.join(", ")}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Enter tags (separated by commas)"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 font-semibold"
        >
          Upload Image
        </button>
      </div>
      <SeeImages />
    </form>
  );
};

export default AddImage;
