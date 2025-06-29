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
      className="mt-6 flex flex-col justify-center items-center w-full min-h-[400px] bg-zinc-900/30 rounded-xl p-6 text-left border-2 border-dashed border-zinc-700/50"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {structure.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center p-8">
          <p className="text-zinc-400 text-center text-lg mb-2">
            Arrastra y suelta elementos aquí
          </p>
          <p className="text-zinc-500 text-sm">
            o haz clic en los botones de arriba
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {structure.map((node) => (
            <div
              key={node.id}
              className="p-3 border border-zinc-800 border-dashed rounded-lg bg-zinc-900/30 hover:bg-zinc-800/50 transition-colors"
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
