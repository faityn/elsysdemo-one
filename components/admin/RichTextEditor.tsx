"use client";

import { useEffect, useRef } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, List, ListOrdered, Redo2, Undo2 } from "lucide-react";

export default function RichTextEditor({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit],
    content: value || "",
    editorProps: {
      attributes: {
        class:
          "min-h-[120px] text-[13px] leading-5 text-[#202a24] focus:outline-none",
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      onChangeRef.current(currentEditor.isEmpty ? "" : currentEditor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [editor, value]);

  function toolbarButton(
    label: string,
    icon: React.ReactNode,
    active: boolean,
    action: () => void,
    disabled = false,
  ) {
    return (
      <button
        key={label}
        type="button"
        title={label}
        aria-label={label}
        aria-pressed={active}
        disabled={disabled}
        onMouseDown={(event) => event.preventDefault()}
        onClick={action}
        className={`grid h-8 w-8 place-items-center rounded transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
          active
            ? "bg-[#e9ece8] text-[#d95610]"
            : "text-[#59635b] hover:bg-[#eef0ed]"
        }`}
      >
        {icon}
      </button>
    );
  }

  return (
    <div className="admin-rich-editor">
      <span className="mb-1.5 block text-[12px] font-semibold text-[#414942]">
        {label}
      </span>
      <div className="overflow-hidden rounded-md border border-[#dfe4df] bg-white focus-within:border-[#eb762f] focus-within:ring-2 focus-within:ring-[#eb762f]/10">
        <div
          role="toolbar"
          aria-label={`${label} форматлах`}
          className="flex gap-1 border-b border-[#edf0ec] bg-[#f8f9f7] p-1.5"
        >
          {toolbarButton(
            "Тод",
            <Bold size={15} />,
            editor?.isActive("bold") ?? false,
            () => editor?.chain().focus().toggleBold().run(),
            !editor,
          )}
          {toolbarButton(
            "Налуу",
            <Italic size={15} />,
            editor?.isActive("italic") ?? false,
            () => editor?.chain().focus().toggleItalic().run(),
            !editor,
          )}
          <span className="mx-1 my-1 w-px bg-[#dfe4df]" aria-hidden="true" />
          {toolbarButton(
            "Эрэмбэгүй жагсаалт",
            <List size={15} />,
            editor?.isActive("bulletList") ?? false,
            () => editor?.chain().focus().toggleBulletList().run(),
            !editor,
          )}
          {toolbarButton(
            "Дугаартай жагсаалт",
            <ListOrdered size={15} />,
            editor?.isActive("orderedList") ?? false,
            () => editor?.chain().focus().toggleOrderedList().run(),
            !editor,
          )}
          <span className="mx-1 my-1 w-px bg-[#dfe4df]" aria-hidden="true" />
          {toolbarButton(
            "Буцаах",
            <Undo2 size={15} />,
            false,
            () => editor?.chain().focus().undo().run(),
            !editor?.can().undo(),
          )}
          {toolbarButton(
            "Дахин хийх",
            <Redo2 size={15} />,
            false,
            () => editor?.chain().focus().redo().run(),
            !editor?.can().redo(),
          )}
        </div>
        <EditorContent editor={editor} className="px-3 py-2.5" />
      </div>
    </div>
  );
}
