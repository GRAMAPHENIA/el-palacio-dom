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
    index?: number
  ) => {
    e.preventDefault();
    
    // Si estamos sobre un elemento específico, actualizamos el dragOverItem
    if (typeof index === 'number' && dragOverItem !== index) {
      setDragOverItem(index);
    }
    
    // Establecer el efecto de arrastre como 'move' o 'copy' según corresponda
    const isFromToolbar = e.dataTransfer.types.includes('text/plain');
    e.dataTransfer.dropEffect = isFromToolbar ? 'copy' : 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index?: number) => {
    e.preventDefault();

    // Si viene de la barra de herramientas
    const tag = e.dataTransfer.getData("text/plain");
    if (tag) {
      const targetIndex = typeof index === 'number' ? index : structure.length;
      
      // Insertar el nuevo elemento en la posición objetivo
      const newStructure = [...structure];
      newStructure.splice(targetIndex, 0, { 
        id: Math.random().toString(36).substr(2, 9),
        tag,
        children: [] 
      });
      
      // Actualizar el estado
      useBuilder.setState({ structure: newStructure });
      setDragOverItem(null);
      return;
    }

    // Si es un reordenamiento
    if (typeof draggedItem === 'number' && typeof index === 'number' && draggedItem !== index) {
      console.log(`Moviendo de ${draggedItem} a ${index}`);
      moveElement(draggedItem, index);
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
      onDragOver={(e) => handleDragOver(e)}
      onDrop={(e) => handleDrop(e)}
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
              className={`p-3 border border-zinc-700/50 rounded-lg transition-all duration-200 ${getItemStyle(index)}`}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
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
