"use client";

import { useBuilder } from "@/features/builder/builderSlice";
import { useCallback, useState } from "react";
import { Trash2 } from "lucide-react";

export default function DropZone() {
  const {
    structure,
    selectedElementId,
    moveElement,
    selectElement,
    removeElement,
  } = useBuilder();
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
      const newId = Math.random().toString(36).substr(2, 9);
      
      // Insertar el nuevo elemento en la posición objetivo
      const newStructure = [...structure];
      newStructure.splice(targetIndex, 0, { 
        id: newId,
        tag,
        attributes: [],
        children: [] 
      });
      
      // Actualizar el estado y seleccionar el nuevo elemento
      useBuilder.setState({ 
        structure: newStructure,
        selectedElementId: newId
      });
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
      onClick={() => selectElement(null)}
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
              className={`group relative p-3 pr-10 border rounded-lg transition-all duration-200 ${getItemStyle(index)} ${
                selectedElementId === node.id 
                  ? 'border-blue-500 bg-zinc-800/50' 
                  : 'border-zinc-700/50 hover:border-zinc-600'
              }`}
              draggable
              onClick={(e) => {
                e.stopPropagation();
                selectElement(node.id);
              }}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeElement(node.id);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 opacity-0 group-hover:opacity-100 hover:bg-red-500/20 rounded-md text-red-400/70 hover:text-red-300 transition-all duration-200"
                title="Eliminar elemento"
              >
                <Trash2 size={14} />
              </button>
              <div className="flex flex-col gap-1">
                <code className="text-zinc-300 font-mono text-sm">
                  {`<${node.tag}`}
                  {node.attributes?.length > 0 && (
                    <span className="text-amber-400">
                      {node.attributes.map(attr => 
                        ` ${attr.name}${attr.value ? `="${attr.value}"` : ''}`
                      )}
                    </span>
                  )}
                  {`>${node.children?.length ? '...' : ''}</${node.tag}>`}
                </code>
                {selectedElementId === node.id && node.attributes.length > 0 && (
                  <div className="mt-1 text-xs text-zinc-400 space-x-2">
                    {node.attributes.slice(0, 2).map(attr => (
                      <span key={attr.id} className="inline-flex items-center">
                        <span className="text-amber-400">{attr.name}</span>
                        {attr.value && (
                          <>
                            <span className="mx-1">=</span>
                            <span className="text-blue-300">&quot;{attr.value}&quot;</span>
                          </>
                        )}
                      </span>
                    ))}
                    {node.attributes.length > 2 && (
                      <span className="text-zinc-500">+{node.attributes.length - 2} más</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
