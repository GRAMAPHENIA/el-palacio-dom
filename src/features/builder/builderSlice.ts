// Ruta: src/features/builder/builderSlice.ts

import { create } from "zustand";
import { v4 as uuid } from "uuid";

export type ElementNode = {
  id: string;
  tag: string;
  children?: ElementNode[];
};

type BuilderState = {
  structure: ElementNode[];
  addElement: (tag: string) => void;
  clearStructure: () => void;
};

export const useBuilder = create<BuilderState>((set) => ({
  structure: [],

  addElement: (tag) =>
    set((state) => ({
      structure: [...state.structure, { id: uuid(), tag, children: [] }],
    })),

  clearStructure: () => set({ structure: [] }),
}));
