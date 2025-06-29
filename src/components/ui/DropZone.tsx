"use client";

import { useBuilder } from "@/features/builder/builderSlice";

export default function DropZone() {
  const { structure, addElement } = useBuilder();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const tag = e.dataTransfer.getData('text/plain');
    if (tag) {
      addElement(tag);
    }
  };

  return (
    <div 
      className="mt-6 w-full min-h-[400px] bg-zinc-900/30 rounded-xl p-6 text-left"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {structure.length === 0 ? (
        <div className="h-full flex items-center justify-center">
          <p className="text-zinc-500 text-center">
            Arrastra y suelta elementos aquí
            <br />
            <span className="text-sm text-zinc-600">o haz clic en los botones de arriba</span>
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {structure.map((node) => (
            <div
              key={node.id}
              className="p-3 border border-zinc-700 rounded-lg bg-zinc-900/50 hover:bg-zinc-800/50 transition-colors"
              draggable
            >
              <code className="text-zinc-300 font-mono">
                {`<${node.tag}>`}
                <span className="text-zinc-500">...</span>
                {`</${node.tag}>`}
              </code>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
