"use client";

import { HTML_ELEMENTS } from "@/types/elements";
import { 
  LayoutPanelLeft, 
  LayoutGrid, 
  PanelRight, 
  FileText, 
  PanelTop, 
  PanelBottom, 
  Menu, 
  Square, 
  Type, 
  Heading1, 
  Heading2, 
  List, 
  ListOrdered, 
  Link2, 
  MousePointerClick,
  HelpCircle
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Mapeo de iconos para cada etiqueta HTML
const ELEMENT_ICONS: Record<string, React.ReactNode> = {
  header: <PanelTop className="w-4 h-4" />,
  main: <LayoutPanelLeft className="w-4 h-4" />,
  section: <LayoutGrid className="w-4 h-4" />,
  article: <FileText className="w-4 h-4" />,
  aside: <PanelRight className="w-4 h-4" />,
  footer: <PanelBottom className="w-4 h-4" />,
  nav: <Menu className="w-4 h-4" />,
  div: <Square className="w-4 h-4" />,
  span: <Type className="w-4 h-4" />,
  p: <Type className="w-4 h-4" />,
  h1: <Heading1 className="w-4 h-4" />,
  h2: <Heading2 className="w-4 h-4" />,
  ul: <List className="w-4 h-4" />,
  li: <ListOrdered className="w-4 h-4" />,
  a: <Link2 className="w-4 h-4" />,
  button: <MousePointerClick className="w-4 h-4" />,
};

const handleDragStart = (e: React.DragEvent<HTMLButtonElement>, tag: string) => {
  e.dataTransfer.setData('text/plain', tag);
  e.dataTransfer.effectAllowed = 'copy';
};

export default function Toolbar() {
  return (
    <TooltipProvider>
      <div className="h-full">
        {/* Título solo en desktop */}
        <h2 className="hidden lg:block text-sm font-medium text-zinc-300 mb-2">
          Elementos HTML
        </h2>
        
        <aside className="flex lg:flex-row flex-col gap-2 overflow-x-auto lg:overflow-visible p-2 bg-zinc-900/30 rounded-xl lg:flex-wrap">
          {HTML_ELEMENTS.map((tag) => (
            <Tooltip key={tag}>
              <TooltipTrigger asChild>
                <button
                  draggable
                  onDragStart={(e) => handleDragStart(e, tag)}
                  className="p-2 text-zinc-200 bg-zinc-900/50 rounded-lg hover:bg-zinc-800/50 cursor-grab active:cursor-grabbing transition flex-shrink-0 flex items-center justify-center lg:justify-start gap-2"
                  aria-label={`Elemento ${tag}`}
                >
                  {/* Solo mostrar iconos en móviles/tablets */}
                  <span className="lg:hidden">
                    {ELEMENT_ICONS[tag] || <HelpCircle className="w-4 h-4" />}
                  </span>
                  
                  {/* Solo mostrar texto en desktop */}
                  <span className="hidden lg:inline text-xs">
                    {`<${tag}>`}
                  </span>
                </button>
              </TooltipTrigger>
              <TooltipContent 
                side="right" 
                sideOffset={10}
                className="bg-zinc-800 text-zinc-200 border-zinc-700 lg:hidden"
              >
                <p>{`<${tag}>`}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </aside>
      </div>
    </TooltipProvider>
  );
}
