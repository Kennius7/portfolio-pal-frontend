"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { File, X } from "lucide-react";
// import * as pdfjsLib from "pdfjs-dist";
// import { GlobalWorkerOptions } from "pdfjs-dist";

import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
// import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs";

GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

// GlobalWorkerOptions.workerSrc = pdfWorker;

// interface FileUploaderProps {
//   value: string;
//   fieldKey: keyof Portfolio;
//   updatePortfolioField: (
//     field: keyof Portfolio,
//     value: Portfolio[keyof Portfolio],
//   ) => void;
// }

// interface FileUploaderProps<T extends Record<string, any>> {
//   value: string;
//   fieldKey: keyof T;
//   setter: React.Dispatch<React.SetStateAction<T | null>>;
//   updateField: <K extends keyof T>(
//     setter: React.Dispatch<React.SetStateAction<T | null>>,
//     field: K,
//     value: T[K],
//   ) => void;
// }

interface FileUploaderProps {
  value: string;
  onChange: (url: string) => void;
}

export default function FileUploader({ value, onChange }: FileUploaderProps) {
  const [fileUrl, setFileUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progressLevel, setProgressLevel] = useState(0);

  // PDF state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pdfDocRef = useRef<any>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loadingPdf, setLoadingPdf] = useState(false);

  // -----------------------------
  // LOAD FIRST PAGE THUMBNAIL ONLY
  // -----------------------------
  useEffect(() => {
    const loadThumbnail = async () => {
      if (!fileUrl) return;
      if (!fileUrl || typeof fileUrl !== "string") return;
      if (!fileUrl.startsWith("http")) return;

      setLoadingPdf(true);

      // const pdf = await pdfjsLib.getDocument(fileUrl).promise;
      const pdf = await getDocument({ url: fileUrl }).promise;
      pdfDocRef.current = pdf;

      setTotalPages(pdf.numPages);

      const page = await pdf.getPage(1);
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;

      const viewport = page.getViewport({ scale: 1.0 });

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({
        canvas,
        canvasContext: ctx,
        viewport,
      }).promise;

      setLoadingPdf(false);
    };

    loadThumbnail();
  }, [fileUrl]);

  // -----------------------------
  // RENDER ANY PAGE (lazy load)
  // -----------------------------
  const renderPage = async (pageNum: number) => {
    if (!pdfDocRef.current) return;

    const page = await pdfDocRef.current.getPage(pageNum);
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const viewport = page.getViewport({ scale: 1.5 });

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({
      canvasContext: ctx,
      viewport,
    }).promise;
  };

  const goNext = async () => {
    if (pageNumber >= totalPages) return;
    const next = pageNumber + 1;
    setPageNumber(next);
    await renderPage(next);
  };

  const goPrev = async () => {
    if (pageNumber <= 1) return;
    const prev = pageNumber - 1;
    setPageNumber(prev);
    await renderPage(prev);
  };

  // -----------------------------
  // SYNC EXTERNAL VALUE
  // -----------------------------
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (value) setFileUrl(value);
  }, [value]);

  // -----------------------------
  // UPLOAD
  // -----------------------------
  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!,
    );

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
      formData,
      {
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / (e.total || 1));
          setProgressLevel(percent);
        },
      },
    );

    return response.data;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);

      const result = await uploadToCloudinary(file);

      setFileUrl(result.secure_url);
      setFileName(file.name);
      onChange(result.secure_url);
      // updateField(setter, fieldKey, result.secure_url);

      // reset PDF state
      setPageNumber(1);
      setTotalPages(0);
      pdfDocRef.current = null;
    } finally {
      setUploading(false);
    }
  };

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileUpload}
        disabled={uploading}
        // className="w-full h-20 border rounded px-4"
        className={`w-full h-20 rounded-md border border-input px-4 py-2 text-left mt-2
          ${uploading ? "cursor-not-allowed" : "cursor-pointer"}`}
      />

      {/* Upload Progress */}
      {uploading && (
        <div>
          <div className="flex justify-between">
            <p>Uploading...</p>
            <p>{progressLevel}%</p>
          </div>

          <div className="h-2 bg-gray-200 rounded">
            <div
              className="h-2 bg-primary rounded"
              style={{ width: `${progressLevel}%` }}
            />
          </div>
        </div>
      )}

      {/* PDF PREVIEW SYSTEM */}
      {fileUrl && (
        <div className="space-y-3">
          {/* Thumbnail / Viewer */}
          <div className="w-full h-[260px] border rounded overflow-hidden">
            <canvas ref={canvasRef} />

            {loadingPdf && <p className="p-2 text-sm">Loading preview...</p>}
          </div>

          {/* Controls */}
          <div className="flex gap-2 items-center justify-between">
            <button
              onClick={goPrev}
              className="px-2 border rounded-md hover:bg-primary/20 transition-all"
            >
              Prev
            </button>

            <span>
              Page {pageNumber} / {totalPages}
            </span>

            <button
              onClick={goNext}
              className="px-2 border rounded-md hover:bg-primary/20 transition-all"
            >
              Next
            </button>
          </div>

          {/* File info */}
          <div className="flex items-center border rounded">
            <File className="w-10 h-10 p-2" />
            <p className="flex-1">PDF: {fileName}</p>

            <button
              onClick={() => {
                setFileUrl("");
                setFileName("");
                onChange("");
              }}
            >
              <X />
            </button>
          </div>

          {/* Cloudinary direct link fallback */}
          {/* <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Open PDF (Cloudinary)
          </a> */}
        </div>
      )}
    </div>
  );
}
