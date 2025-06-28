// Ruta: src/types/elements.ts

export const HTML_ELEMENTS = [
  "header",
  "main",
  "section",
  "article",
  "aside",
  "footer",
  "nav",
  "div",
  "span",
  "p",
  "h1",
  "h2",
  "ul",
  "li",
  "a",
  "button",
] as const;

export type HTMLElementTag = (typeof HTML_ELEMENTS)[number];
