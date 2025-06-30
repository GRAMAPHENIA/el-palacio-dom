"use client";

import { useBuilder } from "@/features/builder/builderSlice";
import { useCallback, useState } from 'react';

export default function DropZone() {
  const { structure, addElement, moveElement } = useBuilder();
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [dragOverItem, setDragOverItem] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    if (draggedItem === null) return;
    
    if (index !== dragOverItem) {
      setDragOverItem(index);
    }
    
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    // Si viene de la barra de herramientas
    const tag = e.dataTransfer.getData('text/plain');
    if (tag) {
      addElement(tag);
      return;
    }
    
    // Si es un reordenamiento
    if (draggedItem !== null && dragOverItem !== null && draggedItem !== dragOverItem) {
      moveElement(draggedItem, dragOverItem);
    }
    
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const getItemStyle = useCallback((index: number) => {
    if (index === draggedItem) return 'opacity-50 bg-zinc-800/70';
    if (index === dragOverItem) return 'border-blue-500/50 bg-zinc-800/30';
    return 'bg-zinc-900/30 hover:bg-zinc-800/30';
  }, [draggedItem, dragOverItem]);

  return (
    <div
      className="h-full flex flex-col w-full bg-zinc-900/30 rounded-xl p-4 border-2 border-dashed border-zinc-700/50"
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
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
              className={`p-3 border border-zinc-700/50 rounded-lg transition-all duration-200 ${getItemStyle(index)}`}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
            >
              <code className="text-zinc-300 font-mono text-sm">
                {`<${node.tag}>`}
                {node.children?.length ? '...' : ''}
                {`</${node.tag}>`}
              </code>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
