"use client";

import DOMPurify from "dompurify";
import { useEffect, useState } from "react";

const allowedTags = [
  "p",
  "br",
  "strong",
  "b",
  "em",
  "i",
  "ul",
  "ol",
  "li",
  "blockquote",
  "h2",
  "h3",
];

export default function RichTextContent({
  content,
  className = "",
}: {
  content: string;
  className?: string;
}) {
  const [safeHtml, setSafeHtml] = useState("");

  useEffect(() => {
    setSafeHtml(
      DOMPurify.sanitize(content ?? "", {
        ALLOWED_TAGS: allowedTags,
        ALLOWED_ATTR: [],
      }),
    );
  }, [content]);

  return (
    <div
      className={`rich-text-content ${className}`}
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  );
}
