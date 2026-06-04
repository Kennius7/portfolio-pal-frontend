"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  FileText,
  X,
  ChevronLeft,
  ChevronRight,
  UploadCloud,
} from "lucide-react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";

GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

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
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loadingPdf, setLoadingPdf] = useState(false);

  // ── Load thumbnail on fileUrl change ──────────────────────────
  useEffect(() => {
    const loadThumbnail = async () => {
      if (
        !fileUrl ||
        typeof fileUrl !== "string" ||
        !fileUrl.startsWith("http")
      )
        return;

      setLoadingPdf(true);
      try {
        const pdf = await getDocument({ url: fileUrl }).promise;
        pdfDocRef.current = pdf;
        setTotalPages(pdf.numPages);
        await renderPageToCanvas(pdf, 1);
      } finally {
        setLoadingPdf(false);
      }
    };

    loadThumbnail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileUrl]);

  // ── Sync external value ───────────────────────────────────────
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (value) setFileUrl(value);
  }, [value]);

  // ── Render helpers ────────────────────────────────────────────
  const getContainerWidth = () => containerRef.current?.clientWidth ?? 320;

  const renderPageToCanvas = async (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pdf: any,
    pageNum: number,
  ) => {
    const page = await pdf.getPage(pageNum);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Scale to fill container width on any screen size
    const unscaled = page.getViewport({ scale: 1 });
    const containerWidth = getContainerWidth();
    const scale = containerWidth / unscaled.width;
    const viewport = page.getViewport({ scale });

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: ctx, viewport }).promise;
  };

  const renderPage = async (pageNum: number) => {
    if (!pdfDocRef.current) return;
    await renderPageToCanvas(pdfDocRef.current, pageNum);
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

  // ── Upload ────────────────────────────────────────────────────
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
      setPageNumber(1);
      setTotalPages(0);
      pdfDocRef.current = null;
    } finally {
      setUploading(false);
      setProgressLevel(0);
    }
  };

  const handleClear = () => {
    setFileUrl("");
    setFileName("");
    onChange("");
    pdfDocRef.current = null;
    setPageNumber(1);
    setTotalPages(0);
    if (inputRef.current) inputRef.current.value = "";
  };

  // ── Render ────────────────────────────────────────────────────
  return (
    <div className="space-y-3">
      {/* Drop-zone trigger */}
      <label
        className={`
          group relative flex min-h-[72px] w-full cursor-pointer flex-col
          items-center justify-center gap-1.5 rounded-xl border border-dashed
          border-input bg-background px-4 py-4 text-center
          transition-colors hover:border-primary/60 hover:bg-accent/40
          ${uploading ? "pointer-events-none opacity-60" : ""}
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          onChange={handleFileUpload}
          disabled={uploading}
          className="sr-only"
          aria-label="Upload PDF"
        />
        <UploadCloud
          className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary"
          aria-hidden="true"
        />
        <span className="text-xs text-muted-foreground">
          {uploading ? "Uploading…" : "Tap to upload PDF"}
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

      {/* PDF Preview */}
      {fileUrl && (
        <div className="space-y-2">
          {/* Canvas container — scales to full width */}
          <div
            ref={containerRef}
            className="relative w-full overflow-hidden rounded-xl border border-border bg-muted"
          >
            {loadingPdf && (
              <div className="flex h-32 items-center justify-center">
                <span className="text-xs text-muted-foreground">
                  Loading preview…
                </span>
              </div>
            )}
            <canvas
              ref={canvasRef}
              className={`w-full ${loadingPdf ? "invisible absolute" : ""}`}
            />
          </div>

          {/* Page controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={goPrev}
                disabled={pageNumber <= 1}
                className="
                  flex h-8 w-8 items-center justify-center rounded-md border border-input
                  text-muted-foreground transition-colors
                  hover:bg-accent hover:text-foreground
                  disabled:pointer-events-none disabled:opacity-40
                "
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>

              <span className="text-xs tabular-nums text-muted-foreground">
                Page {pageNumber} of {totalPages}
              </span>

              <button
                onClick={goNext}
                disabled={pageNumber >= totalPages}
                className="
                  flex h-8 w-8 items-center justify-center rounded-md border border-input
                  text-muted-foreground transition-colors
                  hover:bg-accent hover:text-foreground
                  disabled:pointer-events-none disabled:opacity-40
                "
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          )}

          {/* File info row */}
          <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
            <FileText
              className="h-5 w-5 shrink-0 text-muted-foreground"
              aria-hidden="true"
            />
            <p className="min-w-0 flex-1 truncate text-xs text-muted-foreground">
              {fileName || "resume.pdf"}
            </p>
            <button
              type="button"
              onClick={handleClear}
              className="
                grid h-6 w-6 shrink-0 place-items-center rounded-full
                bg-destructive text-destructive-foreground
                transition-opacity hover:opacity-80
              "
              aria-label="Remove file"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
