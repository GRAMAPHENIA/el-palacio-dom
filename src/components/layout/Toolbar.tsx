// Ruta: src/components/Toolbar.tsx

"use client";

import { HTML_ELEMENTS } from "@/types/elements";

const handleDragStart = (e: React.DragEvent<HTMLButtonElement>, tag: string) => {
  e.dataTransfer.setData('text/plain', tag);
  e.dataTransfer.effectAllowed = 'copy';
};

type Props = {
  onSelect: (element: string) => void;
};

export default function Toolbar({ onSelect }: Props) {
  return (
    <aside className="flex justify-center gap-4 overflow-x-auto p-4 bg-zinc-900/30 rounded-xl">
      {HTML_ELEMENTS.map((tag) => (
        <button
          key={tag}
          onClick={() => onSelect(tag)}
          draggable
          onDragStart={(e) => handleDragStart(e, tag)}
          className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-200 bg-zinc-900 rounded-lg hover:bg-zinc-800 cursor-grab active:cursor-grabbing transition"
        >
          {`<${tag}>`}
        </button>
      ))}
    </aside>
  );
}
