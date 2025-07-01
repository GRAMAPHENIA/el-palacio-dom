// Ruta: src/features/builder/builderSlice.ts

import { create } from "zustand";
import { v4 as uuid } from "uuid";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";

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

type BuilderState = {
  structure: ElementNode[];
  selectedElementId: string | null;
  addElement: (tag: string) => void;
  moveElement: (fromIndex: number, toIndex: number) => void;
  updateElement: (id: string, updates: Partial<Omit<ElementNode, 'id' | 'tag'>>) => void;
  selectElement: (id: string | null) => void;
  updateAttribute: (elementId: string, attributeId: string, updates: Partial<Attribute>) => void;
  addAttribute: (elementId: string) => void;
  removeAttribute: (elementId: string, attributeId: string) => void;
  removeElement: (id: string) => void;
  clearStructure: () => void;
};

const storage: StateStorage = {
  getItem: (name: string) => {
    const value = localStorage.getItem(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: (name: string, value: string) => {
    localStorage.setItem(name, value);
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
};

export const useBuilder = create<BuilderState>()(
  persist(
    (set) => ({
      structure: [],
      selectedElementId: null,
      
      addElement: (tag: string) =>
        set((state) => ({
          structure: [
            ...state.structure, 
            { 
              id: uuid(), 
              tag, 
              attributes: [],
              children: [] 
            }
          ],
        })),
        
      moveElement: (fromIndex: number, toIndex: number) =>
        set((state) => {
          const newStructure = [...state.structure];
          const [movedItem] = newStructure.splice(fromIndex, 1);
          newStructure.splice(toIndex, 0, movedItem);
          return { structure: newStructure };
        }),
        
      updateElement: (id: string, updates: Partial<Omit<ElementNode, 'id' | 'tag'>>) =>
        set((state) => ({
          structure: state.structure.map(node => 
            node.id === id ? { ...node, ...updates } : node
          )
        })),
        
      selectElement: (id: string | null) =>
        set({ selectedElementId: id }),
        
      updateAttribute: (elementId: string, attributeId: string, updates: Partial<Attribute>) =>
        set((state) => ({
          structure: state.structure.map(node => 
            node.id === elementId
              ? {
                  ...node,
                  attributes: node.attributes.map(attr => 
                    attr.id === attributeId ? { ...attr, ...updates } : attr
                  )
                }
              : node
          )
        })),
        
      addAttribute: (elementId: string) =>
        set((state) => ({
          structure: state.structure.map(node => 
            node.id === elementId
              ? {
                  ...node,
                  attributes: [
                    ...node.attributes,
                    { id: uuid(), name: 'nuevo', value: 'valor' }
                  ]
                }
              : node
          )
        })),
        
      removeAttribute: (elementId: string, attributeId: string) =>
        set((state) => ({
          structure: state.structure.map(node => 
            node.id === elementId
              ? {
                  ...node,
                  attributes: node.attributes.filter(attr => attr.id !== attributeId)
                }
              : node
          )
        })),
        
      clearStructure: () => set({ structure: [], selectedElementId: null }),
      removeElement: (id: string) => set((state) => ({
        structure: state.structure.filter((node) => node.id !== id),
        selectedElementId: state.selectedElementId === id ? null : state.selectedElementId,
      })),
    }),
    {
      name: "el-palacio-del-dom",
      storage: createJSONStorage(() => storage),
    }
  )
);
