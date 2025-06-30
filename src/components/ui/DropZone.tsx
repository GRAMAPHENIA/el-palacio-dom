"use client";

import { useBuilder } from "@/features/builder/builderSlice";
import { useCallback, useState } from "react";

export default function DropZone() {
  const { structure, addElement, moveElement } = useBuilder();
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [dragOverItem, setDragOverItem] = useState<number | null>(null);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Solo actualizamos el dragOverItem si es diferente al actual
    if (dragOverItem !== index) {
      setDragOverItem(index);
    }
    
    // Establecer el efecto de arrastre como 'move'
    e.dataTransfer.dropEffect = "move";
    return false;
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // Si viene de la barra de herramientas
    const tag = e.dataTransfer.getData("text/plain");
    if (tag) {
      // Si se está soltando en un elemento específico, lo insertamos en esa posición
      if (dragOverItem !== null) {
        // Usamos el índice donde se soltó el elemento
        const newStructure = [...structure];
        newStructure.splice(dragOverItem, 0, { 
          id: Math.random().toString(36).substr(2, 9),
          tag,
          children: [] 
        });
        // Actualizamos el estado directamente para evitar problemas de sincronización
        useBuilder.setState({ structure: newStructure });
      } else {
        addElement(tag);
      }
      setDragOverItem(null);
      return;
    }

    // Si es un reordenamiento
    if (draggedItem !== null && dragOverItem !== null) {
      // Asegurarnos de que los índices sean válidos
      if (draggedItem >= 0 && dragOverItem >= 0 && draggedItem !== dragOverItem) {
        console.log(`Moviendo de ${draggedItem} a ${dragOverItem}`);
        moveElement(draggedItem, dragOverItem);
      }
    }

    // Resetear estados
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Resetear estados
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const getItemStyle = useCallback(
    (index: number) => {
      const baseStyle = 'transition-all duration-200';
      if (index === draggedItem) return `${baseStyle} opacity-30 bg-zinc-800/70 border-dashed border-zinc-600`;
      if (index === dragOverItem) return `${baseStyle} border-blue-500/70 bg-zinc-800/30 border-2`;
      return `${baseStyle} bg-zinc-900/30 hover:bg-zinc-800/30 border border-zinc-700/50`;
    },
    [draggedItem, dragOverItem]
  );

  return (
    <div
      className="h-full flex flex-col w-full bg-zinc-900/30 rounded-xl p-4 border-2 border-dashed border-zinc-700/50"
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = "move";
      }}
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
        <div className="space-y-2 w-full h-full overflow-y-auto">
          {structure.map((node, index) => (
            <div
              key={node.id}
              className={`p-3 border border-zinc-700/50 rounded-lg transition-all duration-200 ${getItemStyle(
                index
              )}`}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
            >
              <code className="text-zinc-300 font-mono text-sm">
                {`<${node.tag}>`}
                {node.children?.length ? "..." : ""}
                {`</${node.tag}>`}
              </code>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
