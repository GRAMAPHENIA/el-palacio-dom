import React from 'react';
import { 
  BookOpen, 
  Zap, 
  Home, 
  Code2, 
  MousePointerClick, 
  Trash2,
  Move,
  Smartphone,
  CodeXml,
  LayoutGrid,
  Settings2
} from 'lucide-react';
import Link from 'next/link';

const FeatureCard = ({ icon: Icon, title, children, className = '' }: { 
  icon: React.ComponentType<{ className?: string }>; 
  title: string; 
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors ${className}`}>
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-blue-500/10 rounded-lg">
        <Icon className="w-5 h-5 text-blue-400" />
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
    </div>
    <div className="text-zinc-400">
      {children}
    </div>
  </div>
);

const Step = ({ number, title, children }: { number: number; title: string; children: React.ReactNode }) => (
  <div className="flex gap-4 group">
    <div className="flex flex-col items-center">
      <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 font-medium text-sm group-hover:bg-blue-500/20 transition-colors">
        {number}
      </div>
      <div className="w-px h-full bg-zinc-800 mt-2 group-last:hidden"></div>
    </div>
    <div className="pb-8">
      <h4 className="text-white font-medium mb-2">{title}</h4>
      <p className="text-zinc-400 text-sm">{children}</p>
    </div>
  </div>
);

export default function Documentacion() {
  return (
    <div className="min-h-screen bg-zinc-950 relative">
      <Link 
        href="/" 
        className="fixed top-6 left-6 z-50 p-3 rounded-full bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 text-zinc-300 hover:bg-zinc-800/80 hover:text-white transition-colors"
        aria-label="Volver al inicio"
      >
        <Home className="w-5 h-5" />
      </Link>
      
      <main className="container mx-auto p-6 py-12 max-w-5xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 text-sm font-medium rounded-full mb-4">
            <BookOpen className="w-4 h-4" />
            Documentación
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Aprende a usar El Palacio DOM
          </h1>
          <p className="text-lg text-zinc-400">
            Guía completa para crear interfaces web de manera intuitiva con nuestra herramienta de arrastrar y soltar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <FeatureCard icon={Move} title="Arrastra y Suelta">
            <p className="mb-4">
              Construye estructuras HTML de forma intuitiva arrastrando elementos al área de trabajo.
              Soporta anidación y reordenamiento de elementos.
            </p>
          </FeatureCard>
          
          <FeatureCard icon={Settings2} title="Edición en Tiempo Real">
            <p className="mb-4">
              Modifica atributos en tiempo real y ve los cambios reflejados al instante en la vista previa.
            </p>
          </FeatureCard>

          <FeatureCard icon={CodeXml} title="HTML Limpio">
            <p className="mb-4">
              Genera código HTML bien formateado con indentación y resaltado de sintaxis.
              Fácil de copiar y usar en cualquier proyecto.
            </p>
          </FeatureCard>

          <FeatureCard icon={MousePointerClick} title="Selección Intuitiva">
            <p className="mb-4">
              Haz clic en cualquier elemento para seleccionarlo y ver sus atributos.
              Resalta visualmente el elemento seleccionado.
            </p>
          </FeatureCard>

          <FeatureCard icon={Trash2} title="Gestión de Elementos">
            <p className="mb-4">
              Elimina elementos fácilmente con el botón de basura que aparece al pasar el cursor.
              También puedes limpiar todo el área de trabajo.
            </p>
          </FeatureCard>

          <FeatureCard icon={Smartphone} title="Diseño Responsivo">
            <p className="mb-4">
              Interfaz adaptativa que funciona perfectamente en dispositivos móviles y de escritorio.
              Panel de atributos optimizado para pantallas pequeñas.
            </p>
          </FeatureCard>
        </div>

<section id="como-usar" className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
            <Zap className="w-6 h-6 text-blue-400" />
            Guía Rápida
          </h2>
          
          <div className="space-y-1 mb-12">
            <Step number={1} title="Añadir Elementos">
              Haz clic en cualquier botón de la barra de herramientas o arrastra elementos al área de trabajo.
              Los elementos se insertarán en la posición donde los sueltes.
            </Step>
            
            <Step number={2} title="Seleccionar Elementos">
              Haz clic en cualquier elemento para seleccionarlo. Verás un borde azul alrededor del elemento seleccionado.
            </Step>
            
            <Step number={3} title="Editar Atributos">
              Con un elemento seleccionado, usa el panel de atributos para modificar sus propiedades.
              Puedes agregar, editar o eliminar atributos según necesites.
            </Step>

            <Step number={4} title="Eliminar Elementos">
              Pasa el cursor sobre un elemento y haz clic en el ícono de basura que aparece a la derecha.
              Usa el botón &ldquo;Limpiar todo&rdquo; para reiniciar el área de trabajo.
            </Step>

            <Step number={5} title="Copiar el Código">
              Usa el botón de copiar en la sección de vista previa para copiar el código HTML generado.
              El código incluirá toda la estructura que hayas creado.
            </Step>
          </div>

          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2 mt-12">
            <Code2 className="w-6 h-6 text-blue-400" />
            Atajos de Teclado
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2">
                <kbd className="px-2 py-1 bg-zinc-800 rounded text-xs">Ctrl</kbd> + 
                <kbd className="px-2 py-1 bg-zinc-800 rounded text-xs">C</kbd>
                <span className="ml-2">Copiar elemento seleccionado</span>
              </div>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-zinc-300">
                <kbd className="px-2 py-1 bg-zinc-800 rounded text-xs">Supr</kbd>
                <span className="ml-2">Eliminar elemento seleccionado</span>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2 mt-12">
            <LayoutGrid className="w-6 h-6 text-blue-400" />
            Elementos Disponibles
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {['div', 'p', 'h1', 'h2', 'h3', 'span', 'a', 'button', 'img', 'ul', 'ol', 'li', 'input', 'form', 'section', 'article', 'header', 'footer', 'nav', 'aside'].map((tag) => (
              <div key={tag} className="bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-2 text-sm font-mono">
                <span className="text-blue-400">&lt;{tag}&gt;</span>
                <span className="text-zinc-400">...&lt;/{tag}&gt;</span>
              </div>
            ))}
          </div>
        </section>

        <section id="atributos" className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
            <Code2 className="w-6 h-6 text-blue-400" />
            Atributos de Elementos
          </h2>
          
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Tipos de Atributos</h3>
            <p className="text-zinc-300 mb-6">
              Los atributos permiten personalizar el comportamiento y apariencia de los elementos HTML. Aquí tienes una guía de los atributos más comunes:
            </p>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-blue-400 mb-2">Atributos Básicos</h4>
                <ul className="space-y-2 text-zinc-300">
                  <li><code className="bg-zinc-800 px-2 py-1 rounded">id</code> - Identificador único para el elemento</li>
                  <li><code className="bg-zinc-800 px-2 py-1 rounded">class</code> - Clases CSS para estilizar el elemento</li>
                  <li><code className="bg-zinc-800 px-2 py-1 rounded">style</code> - Estilos CSS en línea</li>
                  <li><code className="bg-zinc-800 px-2 py-1 rounded">title</code> - Texto que aparece al pasar el cursor</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-blue-400 mb-2">Atributos de Formulario</h4>
                <ul className="space-y-2 text-zinc-300">
                  <li><code className="bg-zinc-800 px-2 py-1 rounded">type</code> - Tipo de input (text, email, password, etc.)</li>
                  <li><code className="bg-zinc-800 px-2 py-1 rounded">placeholder</code> - Texto de ejemplo en campos vacíos</li>
                  <li><code className="bg-zinc-800 px-2 py-1 rounded">required</code> - Indica que el campo es obligatorio</li>
                  <li><code className="bg-zinc-800 px-2 py-1 rounded">disabled</code> - Desactiva el campo</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-blue-400 mb-2">Atributos de Imagen</h4>
                <ul className="space-y-2 text-zinc-300">
                  <li><code className="bg-zinc-800 px-2 py-1 rounded">src</code> - URL de la imagen</li>
                  <li><code className="bg-zinc-800 px-2 py-1 rounded">alt</code> - Texto alternativo para accesibilidad</li>
                  <li><code className="bg-zinc-800 px-2 py-1 rounded">width/height</code> - Dimensiones de la imagen</li>
                </ul>
              </div>
              
              <div className="bg-blue-900/20 border border-blue-800/50 rounded-lg p-4">
                <h4 className="font-medium text-blue-300 mb-2">Consejo</h4>
                <p className="text-blue-200 text-sm">
                  Puedes agregar cualquier atributo HTML estándar o personalizado. Los atributos personalizados deben comenzar con <code className="bg-blue-900/50 px-1.5 py-0.5 rounded">data-</code> para ser válidos en HTML5.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6 text-blue-400" />
            Funcionalidades Adicionales
          </h2>
          
          <div className="space-y-1">
            <Step number={1} title="Reorganización de Elementos">
              Arrastra los elementos para reordenarlos dentro del área de trabajo.
              Puedes arrastrar elementos para anidarlos dentro de otros elementos.
            </Step>
            
            <Step number={2} title="Exportación de Código">
              Usa el botón de copiar en la vista previa del código para obtener el HTML generado.
              El código incluye toda la estructura y los atributos que hayas configurado.
            </Step>
          </div>
        </section>

        <section className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">¿Necesitas ayuda?</h3>
              <p className="text-zinc-400 max-w-lg">
                Si tienes alguna pregunta o necesitas asistencia, nuestro equipo de soporte está aquí para ayudarte.
              </p>
            </div>
            <a 
              href="mailto:soporte@elpalaciodeldom.com" 
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors whitespace-nowrap"
            >
              Contactar a soporte
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
