import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina múltiples nombres de clases de Tailwind CSS de manera segura.
 * Esta función es útil para manejar clases condicionales y fusionar conflictos de clases.
 *
 * @param inputs - Clases de Tailwind CSS a combinar
 * @returns Cadena de clases combinadas
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
