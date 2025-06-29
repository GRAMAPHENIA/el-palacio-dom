export default function Documentacion() {
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Documentación</h1>
      
      <div className="prose prose-invert max-w-4xl">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Bienvenido a la documentación</h2>
          <p className="text-zinc-300 mb-4">
            Esta es la documentación de El Palacio del DOM. Aquí encontrarás guías y referencias
            para utilizar nuestra herramienta de construcción de interfaces.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Cómo usar el editor</h2>
          <ol className="list-decimal pl-6 space-y-2 text-zinc-300">
            <li>Selecciona un elemento de la barra de herramientas</li>
            <li>Arrastra y suelta en el área de trabajo</li>
            <li>Personaliza las propiedades del elemento</li>
            <li>Repite para agregar más elementos</li>
            <li>Exporta tu diseño cuando hayas terminado</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Soporte</h2>
          <p className="text-zinc-300">
            Si necesitas ayuda, por favor contacta a nuestro equipo de soporte.
          </p>
        </section>
      </div>
    </main>
  );
}
