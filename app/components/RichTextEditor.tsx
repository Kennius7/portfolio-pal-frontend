"use client";

import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
// import { Portfolio } from "../types/types";

// interface RichTextEditorProps {
//   updateField: (
//     setter: React.Dispatch<React.SetStateAction<Portfolio | null>>,
//     field: keyof Portfolio,
//     value: Portfolio[keyof Portfolio],
//   ) => void;
//   fieldKey: keyof Portfolio;
//   value: string;
//   setPortfolioForm: React.Dispatch<React.SetStateAction<Portfolio | null>>;
// }

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({
  value,
  onChange,
}: RichTextEditorProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const editor = useEditor({
    immediatelyRender: true,
    extensions: [
      StarterKit.configure({
        link: false,
      }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  //   const saveContent = () => {
  //     if (!editor) return;

  //     const html = editor.getHTML(); // or JSON via editor.getJSON()
  //     updatePortfolioField(fieldKey, html);
  //   };

  if (!mounted || !editor) return null;

  return (
    <div>
      <div className="flex gap-8 rounded border p-2 mb-2">
        <button
          className="py-1 px-3 rounded-sm border border-primary"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          Bold
        </button>

        <button
          className="py-1 px-3 rounded-sm border border-primary"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          Italic
        </button>

        <button
          className={
            "py-1 px-3 rounded-sm border border-primary" +
            (editor.isActive("heading", { level: 1 }) ? "underline" : "")
          }
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          H1
        </button>

        <button
          className="py-1 px-3 rounded-sm border border-primary"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </button>

        <button
          className="py-1 px-3 rounded-sm border border-primary"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          • List
        </button>

        <button
          className="py-1 px-3 rounded-sm border border-primary"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1. List
        </button>

        <button
          className="py-1 px-3 rounded-sm border border-primary"
          onClick={() => {
            const url = prompt("Enter URL");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
        >
          Link
        </button>
      </div>

      <EditorContent editor={editor} className="border p-3 min-h-[200px]" />

      {/* <button
        className={`py-1 px-4 rounded-sm bg-primary mt-4 
            ${value !== editor.getHTML() ? "cursor-pointer hover:bg-primary/80" : "cursor-not-allowed bg-gray-500"}`}
        onClick={saveContent}
        // disabled={value === editor.getHTML()}
      >
        {value !== editor.getHTML() ? "Wanna Save?" : "Saved"}
      </button> */}
    </div>
  );
}
