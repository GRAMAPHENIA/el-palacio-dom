import React from 'react';
import { BookOpen, Code, GitBranch, Zap, ArrowRight, ExternalLink, Home } from 'lucide-react';
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
    <main className="min-h-screen bg-zinc-950 relative">
      <Link 
        href="/" 
        className="fixed top-6 left-6 z-50 p-3 rounded-full bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 text-zinc-300 hover:bg-zinc-800/80 hover:text-white transition-colors"
        aria-label="Volver al inicio"
      >
        <Home className="w-5 h-5" />
      </Link>
      <div className="container mx-auto p-6 py-12 max-w-5xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 text-sm font-medium rounded-full mb-4">
            <BookOpen className="w-4 h-4" />
            Documentación
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Aprende a usar El Palacio del DOM
          </h1>
          <p className="text-lg text-zinc-400">
            Guía completa para crear interfaces web de manera intuitiva con nuestra herramienta de arrastrar y soltar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <FeatureCard icon={Zap} title="Fácil de usar">
            <p className="mb-4">
              Crea interfaces web completas sin necesidad de escribir código. Solo arrastra, suelta y personaliza.
            </p>
            <a href="/el-palacio-dom" className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium group">
              Probar ahora <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </a>
          </FeatureCard>
          
          <FeatureCard icon={Code} title="Código limpio">
            <p className="mb-4">
              Genera código HTML limpio y semántico que puedes copiar y usar en cualquier proyecto.
            </p>
            <a href="#como-usar" className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium group">
              Ver ejemplos <ExternalLink className="w-4 h-4 ml-1" />
            </a>
          </FeatureCard>
        </div>

        <section id="como-usar" className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
            <Zap className="w-6 h-6 text-blue-400" />
            Cómo usar el editor
          </h2>
          
          <div className="space-y-1">
            <Step number={1} title="Selecciona un elemento">
              Elige entre los elementos HTML disponibles en la barra de herramientas.
            </Step>
            
            <Step number={2} title="Arrástralo al área de trabajo">
              Haz clic y arrastra el elemento hasta soltarlo en la posición deseada.
            </Step>
            
            <Step number={3} title="Personaliza las propiedades">
              Ajusta las propiedades del elemento según tus necesidades.
            </Step>
            
            <Step number={4} title="Reorganiza los elementos">
              Arrastra los elementos para reordenarlos dentro del área de trabajo.
            </Step>
            
            <Step number={5} title="Copia el código generado">
              Usa el botón de copiar en la vista previa del código para obtener el HTML.
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
      </div>
    </main>
  );
}
