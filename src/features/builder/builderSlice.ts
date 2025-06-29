// Ruta: src/features/builder/builderSlice.ts

import { create } from 'zustand';
import { v4 as uuid } from 'uuid';
import { persist } from 'zustand/middleware';

type ElementNode = {
  id: string;
  tag: string;
  children?: ElementNode[];
};

type Store = {
  structure: ElementNode[];
  addElement: (tag: string) => void;
  clearStructure: () => void;
};

// Definimos el store con tipado estricto
type SetState = (fn: (state: Store) => Partial<Store>) => void;

const store = (set: SetState) => ({
  structure: [] as ElementNode[],
  addElement: (tag: string) =>
    set((state) => ({
      structure: [...state.structure, { id: uuid(), tag, children: [] }],
    })),
  clearStructure: () => set(() => ({ structure: [] })),
});

// @ts-expect-error - Ignoramos temporalmente los errores de tipado
export const useBuilder = create(persist(store, { name: 'el-palacio-del-dom' }));
