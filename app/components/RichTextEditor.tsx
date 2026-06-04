"use client";

import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Link as LinkIcon,
} from "lucide-react";
import { cn } from "@/app/lib/utils";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  label: string;
  children: React.ReactNode;
}

function ToolbarButton({
  onClick,
  isActive,
  label,
  children,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={isActive}
      className={cn(
        // Base — large enough tap target on mobile
        "flex h-8 w-8 items-center justify-center rounded-md border text-sm transition-colors",
        // Inactive
        "border-input text-muted-foreground hover:border-primary/60 hover:bg-accent hover:text-foreground",
        // Active
        isActive && "border-primary bg-primary/10 text-primary",
      )}
    >
      {children}
    </button>
  );
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
      StarterKit.configure({ link: false }),
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

  if (!mounted || !editor) return null;

  const handleSetLink = () => {
    const url = prompt("Enter URL");
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };

  return (
    <div className="overflow-hidden rounded-xl border border-input">
      {/* Toolbar — wraps onto a second row on very small screens */}
      <div
        role="toolbar"
        aria-label="Text formatting"
        className="flex flex-wrap gap-1.5 border-b border-input bg-muted/40 px-2 py-2"
      >
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
          label="Bold"
        >
          <Bold className="h-3.5 w-3.5" aria-hidden="true" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
          label="Italic"
        >
          <Italic className="h-3.5 w-3.5" aria-hidden="true" />
        </ToolbarButton>

        <div
          className="mx-0.5 w-px self-stretch bg-border"
          aria-hidden="true"
        />

        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          isActive={editor.isActive("heading", { level: 1 })}
          label="Heading 1"
        >
          <Heading1 className="h-3.5 w-3.5" aria-hidden="true" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          isActive={editor.isActive("heading", { level: 2 })}
          label="Heading 2"
        >
          <Heading2 className="h-3.5 w-3.5" aria-hidden="true" />
        </ToolbarButton>

        <div
          className="mx-0.5 w-px self-stretch bg-border"
          aria-hidden="true"
        />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
          label="Bullet list"
        >
          <List className="h-3.5 w-3.5" aria-hidden="true" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
          label="Ordered list"
        >
          <ListOrdered className="h-3.5 w-3.5" aria-hidden="true" />
        </ToolbarButton>

        <div
          className="mx-0.5 w-px self-stretch bg-border"
          aria-hidden="true"
        />

        <ToolbarButton
          onClick={handleSetLink}
          isActive={editor.isActive("link")}
          label="Insert link"
        >
          <LinkIcon className="h-3.5 w-3.5" aria-hidden="true" />
        </ToolbarButton>
      </div>

      {/* Editor content area */}
      <EditorContent
        editor={editor}
        className="min-h-[160px] px-3 py-2.5 text-sm sm:min-h-[200px] [&_.ProseMirror]:outline-none"
      />
    </div>
  );
}
