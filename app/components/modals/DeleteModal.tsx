"use client";

import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  handleDelete: () => void;
}

export default function DeleteModal({
  isOpen,
  onClose,
  title = "Item",
  handleDelete,
}: DeleteModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900">
        <div className="mb-4 flex flex-col items-center justify-center gap-4 p-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">Delete {title}</h2>
            <AlertCircle className="h-5 w-5 text-red-500" />
          </div>

          <div className="flex items-center gap-2 text-center max-w-[350px]">
            Are you sure you want to delete this {title}? This action cannot be
            undone.
          </div>

          <div className="flex items-center justify-between w-full mt-8 px-4">
            <button
              onClick={onClose}
              className="rounded px-6 py-1 transition hover:bg-zinc-100 
                dark:hover:bg-zinc-800 border border-primary cursor-pointer"
              aria-label="Close modal"
            >
              Close
            </button>

            <button
              onClick={handleDelete}
              className="rounded px-6 py-1 font-semibold text-red-500 transition 
                hover:bg-red-500/30 border border-red-500 cursor-pointer"
              aria-label="Delete modal"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
