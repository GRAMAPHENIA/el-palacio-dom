"use client";

import { useBuilder } from "@/features/builder/builderSlice";
import { Plus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

type Attribute = {
  id: string;
  name: string;
  value: string;
};

type ElementNode = {
  id: string;
  tag: string;
  attributes: Attribute[];
  children?: ElementNode[];
};

export default function AttributesPanel() {
  const { 
    structure, 
    selectedElementId,
    updateAttribute,
    addAttribute,
    removeAttribute
  } = useBuilder();
  
  const [selectedElement, setSelectedElement] = useState<ElementNode | null>(null);
  
  useEffect(() => {
    if (selectedElementId) {
      const element = structure.find(el => el.id === selectedElementId);
      if (element) {
        setSelectedElement(element);
      } else {
        setSelectedElement(null);
      }
    } else {
      setSelectedElement(null);
    }
  }, [selectedElementId, structure]);

  if (!selectedElement) {
    return (
      <div className="h-full flex items-center justify-center text-zinc-500 text-sm">
        Selecciona un elemento para editar sus atributos
      </div>
    );
  }

  const handleAttributeChange = (attrId: string, field: 'name' | 'value', value: string) => {
    if (!selectedElementId) return;
    updateAttribute(selectedElementId, attrId, { [field]: value });
  };

  const handleAddAttribute = () => {
    if (!selectedElementId) return;
    addAttribute(selectedElementId);
  };

  const handleRemoveAttribute = (attrId: string) => {
    if (!selectedElementId) return;
    removeAttribute(selectedElementId, attrId);
  };

  return (
    <div className="space-y-4 pb-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-zinc-300">
          &lt;{selectedElement.tag}&gt; Atributos
        </h3>
        <button
          onClick={handleAddAttribute}
          className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          title="Agregar atributo"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      
      {selectedElement.attributes.length === 0 ? (
        <p className="text-zinc-500 text-sm">
          No hay atributos. Haz clic en + para agregar uno.
        </p>
      ) : (
        <div className="space-y-3">
          {selectedElement.attributes.map((attr: Attribute) => (
            <div key={attr.id} className="relative group">
              <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                <div className="w-full sm:w-auto sm:flex-1">
                  <input
                    type="text"
                    value={attr.name}
                    onChange={(e) => handleAttributeChange(attr.id, 'name', e.target.value)}
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded px-2 py-1.5 text-sm text-white"
                    placeholder="nombre"
                  />
                </div>
                <span className="hidden sm:inline text-zinc-500">=</span>
                <div className="w-full sm:w-auto sm:flex-1 flex items-center gap-2">
                  <input
                    type="text"
                    value={attr.value}
                    onChange={(e) => handleAttributeChange(attr.id, 'value', e.target.value)}
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded px-2 py-1.5 text-sm text-white"
                    placeholder="valor"
                  />
                  <button
                    onClick={() => handleRemoveAttribute(attr.id)}
                    className="p-1.5 text-red-400 hover:text-red-300 rounded-md hover:bg-red-500/20 transition-colors"
                    title="Eliminar atributo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
