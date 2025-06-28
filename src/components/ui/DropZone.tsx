// Ruta: src/components/ui/DropZone.tsx

"use client";

import { useBuilder } from "@/features/builder/builderSlice";

export default function DropZone() {
  const { structure } = useBuilder();

  return (
    <div className="mt-6 w-full min-h-[400px] bg-zinc-900/30 rounded-xl p-6 text-left">
      {structure.length === 0 ? (
        <p className="text-zinc-500">
          Agregá elementos desde la barra superior.
        </p>
      ) : (
        structure.map((node) => (
          <div
            key={node.id}
            className="p-2 border border-zinc-700 rounded-lg mb-2"
          >
            <code className="text-zinc-400">{`<${node.tag}>...</${node.tag}>`}</code>
          </div>
        ))
      )}
    </div>
  );
}
