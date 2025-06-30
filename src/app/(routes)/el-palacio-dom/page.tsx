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
    <div className="min-h-screen flex flex-col bg-zinc-950">
      {/* Navbar fijo en la parte superior */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link 
            href="/" 
            className="p-2 rounded-full bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 hover:text-white transition-colors"
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
      </nav>

      {/* Contenido principal con padding para el navbar fijo */}
      <main className="flex-1 pt-24 pb-16 flex">
        {/* Menú lateral para móviles */}
        <div className="lg:hidden fixed inset-y-0 left-0 z-40 w-16 bg-zinc-900/80 backdrop-blur-sm border-r border-zinc-800 pt-16">
          <Toolbar />
        </div>

        <div className="container mx-auto px-6 flex-1 flex flex-col lg:pl-0 pl-20">
          <header className="mb-8 text-center lg:text-left">
            <h1 className="text-3xl font-bold text-white mb-2">Editor de Elementos</h1>
            <p className="text-zinc-400">
              Arrastra y suelta elementos para construir tu interfaz
            </p>
          </header>


          <div className="space-y-6 flex-1 flex flex-col">
            <div className="hidden lg:block">
              <Toolbar />
            </div>
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

      {/* Footer fijo en la parte inferior */}
      <footer className="py-4 bg-zinc-900/50 border-t border-zinc-800">
        <div className="container mx-auto px-6 text-center text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} El Palacio DOM. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
