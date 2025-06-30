"use client";

import { useBuilder } from "@/features/builder/builderSlice";

const formatNode = (node: any, level: number = 0): string => {
  const indent = '  '.repeat(level);
  if (!node) return '';
  
  if (node.children && node.children.length > 0) {
    const children = node.children.map((child: any) => formatNode(child, level + 1)).join('\n');
    return `${indent}<${node.tag}>\n${children}\n${indent}</${node.tag}>`;
  }
  
  return `${indent}<${node.tag}></${node.tag}>`;
};

export default function CodeViewer() {
  const { structure } = useBuilder();
  
  const formattedCode = structure.length > 0 
    ? structure.map(node => formatNode(node)).join('\n')
    : '<!-- Agrega elementos para ver el código generado -->';

  return (
    <div className="w-full h-full bg-zinc-900/30 rounded-xl p-6 overflow-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-zinc-300 font-mono text-sm">HTML Preview</h3>
        <button 
          onClick={() => navigator.clipboard.writeText(formattedCode)}
          className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          Copiar
        </button>
      </div>
      <pre className="font-mono text-sm text-zinc-300 overflow-x-auto">
        <code>
          {formattedCode}
        </code>
      </pre>
    </div>
  );
}
