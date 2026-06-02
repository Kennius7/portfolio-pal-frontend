"use client";

import DOMPurify from "isomorphic-dompurify";

export default function SafeRichText({ html }: { html: string }) {
  const cleanHtml = DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
  });

  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}
