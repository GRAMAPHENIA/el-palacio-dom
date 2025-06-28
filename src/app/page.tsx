// Ruta: src/components/Home.tsx

"use client";

import { cn } from "@/libs/utils";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4 text-center">
      <h1
        className={cn(
          "text-5xl sm:text-6xl md:text-9xl font-semibold tracking-tight rounded-xl bg-clip-text text-transparent",
          "bg-gradient-to-r from-zinc-400 to-zinc-700"
        )}
      >
        EL PALACIO DOM
      </h1>

      <p className="mt-6 max-w-xl text-zinc-400 text-lg sm:text-xl">
        Construí interfaces mágicas arrastrando y soltando elementos. Dominá el
        HTML como si fuera una alquimia visual.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <button className="rounded-xl px-6 py-3 border bg-zinc-900/20 hover:bg-zinc-700/40 text-zinc-500 hover:text-white transition cursor-pointer">
          Empezar
        </button>
        <button className="rounded-xl px-6 py-3 border bg-zinc-900/20 hover:bg-zinc-700/40 text-zinc-500 hover:text-white transition cursor-pointer">
          Ver tutorial
        </button>
      </div>
    </main>
  );
}
