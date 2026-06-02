"use client";

import { useEffect, useState } from "react";
import SafeImage from "./SafeImage";
import axios from "axios";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  className?: string;
  imageWidth?: number;
  imageHeight?: number;
}

export default function ImageUploader({
  value,
  onChange,
  className = "h-20 mt-2",
  imageWidth = 256,
  imageHeight = 200,
}: ImageUploaderProps) {
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progressLevel, setProgressLevel] = useState(0);
  // console.log("Image URL:>>>>>>>>>>>>", imageUrl);

  useEffect(() => {
    if (value) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setImageUrl(value);
    }
  }, [value]);

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!,
    );

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1),
          );

          setProgressLevel(percent);
        },
      },
    );

    return response.data;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const result = await uploadToCloudinary(file);
      setImageUrl(result.secure_url);
      onChange(result.secure_url);

      console.log("Result data:>>>>>>>>>", result);
      console.log("Image URL:", result.secure_url);
      console.log("Public ID:", result.public_id);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className={`w-full rounded-md border border-input px-4 py-1 text-left 
          ${className}
          ${uploading ? "cursor-not-allowed" : "cursor-pointer"}`}
        disabled={uploading}
        placeholder="Upload Image"
      />

      {uploading && (
        <div className="space-y-2">
          <div>
            <div className="flex justify-between">
              <p>Uploading...</p>
              <p>{progressLevel}%</p>
            </div>
            <div className="h-2 bg-gray-200 rounded">
              <div
                className="h-2 bg-primary rounded transition-all duration-1000 ease-in-out"
                style={{ width: `${progressLevel}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {imageUrl !== "" && (
        <SafeImage
          src={imageUrl}
          alt="Uploaded"
          width={imageWidth}
          height={imageHeight}
          className="rounded-sm h-auto"
        />
      )}
    </div>
  );
}
