"use client";

import { useBuilder } from "@/features/builder/builderSlice";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface Node {
  id: string;
  tag: string;
  attributes?: Array<{ id: string; name: string; value: string }>;
  children?: Node[];
}

const formatAttribute = (attr: { name: string; value: string }) => {
  if (!attr.value) return attr.name;
  return `${attr.name}="${attr.value}"`;
};

const formatNode = (node: Node, level: number = 0): { lines: string[] } => {
  const indent = '  '.repeat(level);
  if (!node) return { lines: [] };
  
  const openTag = `<span class="text-blue-400">&lt;${node.tag}</span>${
    node.attributes?.length 
      ? ' ' + node.attributes.map(attr => 
          `<span class="text-amber-400">${formatAttribute(attr)}</span>`
        ).join(' ')
      : ''
  }<span class="text-blue-400">&gt;</span>`;

  const closeTag = `<span class="text-blue-400">&lt;/${node.tag}&gt;</span>`;

  if (node.children?.length) {
    const children = node.children.flatMap(child => 
      formatNode(child, level + 1).lines
    );
    return {
      lines: [
        `${indent}${openTag}`,
        ...children,
        `${indent}${closeTag}`
      ]
    };
  }
  
  return {
    lines: [`${indent}${openTag}${closeTag}`]
  };
};

export default function CodeViewer() {
  const { structure } = useBuilder();
  const [copied, setCopied] = useState(false);
  
  const formatCode = () => {
    if (structure.length === 0) {
      return [
        '<span class="text-zinc-500 italic">&lt;!-- Agrega elementos para ver el código generado --&gt;</span>'
      ];
    }
    
    return structure.flatMap(node => formatNode(node).lines);
  };

  const formattedLines = formatCode();
  const codeContent = formattedLines.join('\n');

  const handleCopy = async () => {
    try {
      const plainText = formattedLines.map(line => 
        line.replace(/<[^>]*>/g, '')
      ).join('\n');
      
      await navigator.clipboard.writeText(plainText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar el código:', err);
    }
  };

  return (
    <div className="w-full h-full bg-zinc-900/30 rounded-xl overflow-hidden flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-zinc-700/50">
        <h3 className="text-zinc-300 font-medium text-sm">Vista Previa HTML</h3>
        <button 
          onClick={handleCopy}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md transition-colors ${
            copied 
              ? 'text-green-400 bg-green-900/20 border border-green-800/50' 
              : 'text-zinc-300 bg-zinc-800/50 hover:bg-zinc-700/50'
          }`}
          disabled={structure.length === 0}
        >
          {copied ? (
            <>
              <Check size={14} />
              <span>¡Copiado!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copiar código</span>
            </>
          )}
        </button>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        <div className="relative">
          <pre className="font-mono text-sm text-zinc-300 overflow-x-auto">
            <code className="block min-w-max">
              {formattedLines.map((line, i) => (
                <div key={i} className="flex group hover:bg-zinc-800/30 rounded -ml-2 pl-2">
                  <span className="text-zinc-500 select-none mr-4 w-6 text-right">
                    {i + 1}
                  </span>
                  <span 
                    className="flex-1" 
                    dangerouslySetInnerHTML={{ __html: line || '&nbsp;' }}
                  />
                </div>
              ))}
            </code>
          </pre>
        </div>
      </div>
      
      <style jsx global>{`
        .code-attr-name {
          color: #fbbf24; /* amber-400 */
        }
        .code-attr-value {
          color: #34d399; /* emerald-400 */
        }
        .code-tag {
          color: #60a5fa; /* blue-400 */
        }
        .code-comment {
          color: #71717a; /* zinc-500 */
          font-style: italic;
        }
      `}</style>
    </div>
  );
}
