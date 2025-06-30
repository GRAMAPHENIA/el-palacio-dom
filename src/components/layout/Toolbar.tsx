// Ruta: src/components/Toolbar.tsx

"use client";

import { HTML_ELEMENTS } from "@/types/elements";

const handleDragStart = (e: React.DragEvent<HTMLButtonElement>, tag: string) => {
  e.dataTransfer.setData('text/plain', tag);
  e.dataTransfer.effectAllowed = 'copy';
};

export default function Toolbar() {
  return (
    <div className="space-y-2">
      <h2 className="text-sm font-medium text-zinc-300">Elementos HTML</h2>
      <aside className="flex gap-2 overflow-x-auto p-4 bg-zinc-900/30 rounded-xl">
        {HTML_ELEMENTS.map((tag) => (
          <button
            key={tag}
            draggable
            onDragStart={(e) => handleDragStart(e, tag)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-200 bg-zinc-900/50 rounded-lg hover:bg-zinc-800/50 cursor-grab active:cursor-grabbing transition whitespace-nowrap"
          >
            {`<${tag}>`}
          </button>
        ))}
      </aside>
    </div>
  );
}
