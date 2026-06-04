"use client";

import { useEffect, useRef, useState } from "react";
import SafeImage from "./SafeImage";
import axios from "axios";
import { UploadCloud, X } from "lucide-react";

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
  className,
  imageWidth = 256,
  imageHeight = 200,
}: ImageUploaderProps) {
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progressLevel, setProgressLevel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (value) setImageUrl(value);
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
        headers: { "Content-Type": "multipart/form-data" },
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
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
      setProgressLevel(0);
    }
  };

  const handleClear = () => {
    setImageUrl("");
    onChange("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-3">
      {/* Drop-zone style trigger */}
      <label
        className={`
          group relative flex min-h-[72px] w-full cursor-pointer flex-col
          items-center justify-center gap-1.5 rounded-xl border border-dashed
          border-input bg-background px-4 py-4 text-center
          transition-colors hover:border-primary/60 hover:bg-accent/40
          ${uploading ? "pointer-events-none opacity-60" : ""}
          ${className ?? ""}
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={uploading}
          className="sr-only"
          aria-label="Upload image"
        />
        <UploadCloud
          className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary"
          aria-hidden="true"
        />
        <span className="text-xs text-muted-foreground">
          {uploading ? "Uploading…" : "Tap to upload image"}
        </span>
      </label>

      {/* Progress bar */}
      {uploading && (
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Uploading…</span>
            <span>{progressLevel}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300 ease-in-out"
              style={{ width: `${progressLevel}%` }}
              role="progressbar"
              aria-valuenow={progressLevel}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      )}

      {/* Preview */}
      {imageUrl && (
        <div className="relative w-fit">
          <SafeImage
            src={imageUrl}
            alt="Uploaded preview"
            width={imageWidth}
            height={imageHeight}
            className="max-h-40 w-auto rounded-lg object-cover sm:max-h-48"
          />
          <button
            type="button"
            onClick={handleClear}
            className="
              absolute -right-2 -top-2 grid h-6 w-6 place-items-center
              rounded-full bg-destructive text-destructive-foreground
              shadow-sm transition-opacity hover:opacity-80
            "
            aria-label="Remove image"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
