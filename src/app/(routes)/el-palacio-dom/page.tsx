"use client";

import Toolbar from "@/components/layout/Toolbar";
import DropZone from "@/components/ui/DropZone";
import { useBuilder } from "@/features/builder/builderSlice";

export default function ElPalacioDom() {
  const { addElement, clearStructure } = useBuilder();

  return (
    <main className="container h-screen mx-auto p-6 bg-zinc-950 ">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white">Editor de Elementos</h1>
        <p className="text-zinc-400">
          Arrastra y suelta elementos para construir tu interfaz
        </p>
      </header>

      <div className="space-y-6">
        <Toolbar onSelect={addElement} />
        <DropZone />

        <div className="flex justify-end">
          <button
            onClick={clearStructure}
            className="px-4 py-2 text-sm text-zinc-200 bg-red-600 hover:bg-red-700 rounded-lg transition"
          >
            Limpiar todo
          </button>
        </div>
      </div>
    </main>
  );
}
