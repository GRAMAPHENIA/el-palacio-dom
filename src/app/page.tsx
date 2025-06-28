// Ruta: src/components/Home.tsx

"use client";

import Toolbar from "@/components/layout/Toolbar";
import DropZone from "@/components/ui/DropZone";
import { useBuilder } from "@/features/builder/builderSlice";

export default function Home() {
  const { addElement, clearStructure } = useBuilder();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4 py-8 text-center">
      <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight rounded-xl bg-clip-text text-transparent bg-gradient-to-r from-zinc-400 to-zinc-700">
        El Palacio del DOM
      </h1>

      <p className="mt-6 max-w-xl text-zinc-400 text-lg sm:text-xl">
        Construí interfaces mágicas arrastrando y soltando elementos.
      </p>

      <div className="mt-8 w-full max-w-3xl space-y-4">
        <Toolbar onSelect={addElement} />
        <DropZone />

        <div className="flex justify-end">
          <button
            onClick={clearStructure}
            className="mt-4 px-4 py-2 text-sm text-zinc-200 bg-zinc-800 rounded-lg hover:bg-red-800/70 transition"
          >
            Limpiar todo
          </button>
        </div>
      </div>
    </main>
  );
}
