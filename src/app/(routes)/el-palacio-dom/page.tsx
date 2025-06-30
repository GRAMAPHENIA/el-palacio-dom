"use client";

import { Home, BookOpen } from 'lucide-react';
import Link from 'next/link';
import Toolbar from "@/components/layout/Toolbar";
import DropZone from "@/components/ui/DropZone";
import CodeViewer from "@/components/ui/CodeViewer";
import { useBuilder } from "@/features/builder/builderSlice";

export default function ElPalacioDom() {
  const { clearStructure } = useBuilder();

  return (
    <main className="h-screen flex flex-col bg-zinc-950 relative">
      <div className="fixed top-6 left-6 right-6 flex justify-between z-50">
        <Link 
          href="/" 
          className="p-3 rounded-full bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 text-zinc-300 hover:bg-zinc-800/80 hover:text-white transition-colors"
          aria-label="Volver al inicio"
        >
          <Home className="w-5 h-5" />
        </Link>
        <Link 
          href="/documentacion" 
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
        >
          <BookOpen className="w-4 h-4" />
          Documentación
        </Link>
      </div>
      <div className="container mx-auto p-6 pt-24 flex-1 flex flex-col">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">Editor de Elementos</h1>
          <p className="text-zinc-400">
            Arrastra y suelta elementos para construir tu interfaz
          </p>
        </header>

        <div className="space-y-6 flex-1 flex flex-col">
          <Toolbar />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-sm font-medium text-zinc-300">Área de trabajo</h2>
                <button
                  onClick={clearStructure}
                  className="px-3 py-1 text-xs text-zinc-300 bg-zinc-800/50 hover:bg-zinc-800 rounded transition cursor-pointer"
                >
                  Limpiar todo
                </button>
              </div>
              <DropZone />
            </div>
            
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-sm font-medium text-zinc-300">Vista previa del código</h2>
              </div>
              <CodeViewer />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
