import DetectorProveedor from "../components/DetectorProveedor";

const Herramientas = () => {
  return (
    <section className="bg-gradient-to-b  text-texto">
      {/* Encabezado */}
      <div className="w-full py-20 text-center px-6">
        <h1 className="text-4xl font-extrabold mb-4">🔧 Herramientas Red-Fi</h1>
        <p className="text-lg text-texto/70 max-w-2xl mx-auto">
          Ejecutá pruebas clave y obtené información útil sobre tu red actual.
        </p>
      </div>

      {/* Test de velocidad */}
      <div className="w-full bg-white/5 border-t border-white/10 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Test de Velocidad</h2>
          <iframe
            src="https://librespeed.org"
            className="w-full h-[700px] rounded-lg shadow-xl border border-white/10"
            title="Test de Velocidad"
          />
        </div>
      </div>

      {/* Detector de proveedor */}
      <div className="w-full bg-white/5 border-t border-white/10 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Información de tu Red</h2>
          <DetectorProveedor />
        </div>
      </div>
    </section>
  );
};

export default Herramientas;
