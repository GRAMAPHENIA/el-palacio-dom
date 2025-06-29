"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4 py-8 text-center">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-400 to-zinc-600 mb-6">
          El Palacio del DOM
        </h1>
        
        <p className="text-xl text-zinc-300 mb-10">
          Construye interfaces web de manera intuitiva con nuestro editor de arrastrar y soltar.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/el-palacio-dom"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Ingresar
          </Link>
          
          <Link 
            href="/documentacion"
            className="px-6 py-3 border border-zinc-700 hover:bg-zinc-800 text-white font-medium rounded-lg transition-colors"
          >
            Documentación
          </Link>
        </div>
      </div>
    </main>
  );
}
