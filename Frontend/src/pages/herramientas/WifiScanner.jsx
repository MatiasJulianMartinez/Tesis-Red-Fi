import { useEffect, useRef, useState } from "react";
import MainH2 from "../../components/ui/MainH2";
import { IconBorderAll } from "@tabler/icons-react";

const ZONAS = ["Pieza", "Living", "Segundo piso"];

const WifiScanner = () => {
  const [zonaSeleccionada, setZonaSeleccionada] = useState("");
  const [resultados, setResultados] = useState({});
  const [recomendacion, setRecomendacion] = useState("");
  const [enProgreso, setEnProgreso] = useState(false);
  const medidorRef = useRef(null);
  const testActivo = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/speedtest/speedtest.js";
    script.async = true;
    script.onload = () => {
      if (window.Speedtest) {
        medidorRef.current = new window.Speedtest();
        console.log("✅ Speedtest inicializado");
      } else {
        console.error("❌ Speedtest.js no se cargó correctamente.");
      }
    };
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const medirZona = () => {
    if (!zonaSeleccionada || !medidorRef.current) return;

    if (testActivo.current && testActivo.current._state !== 4) {
      testActivo.current.abort();
    }

    const t = new window.Speedtest();
    testActivo.current = t;
    let datosSeteados = false;
    setEnProgreso(true);

    t.onupdate = (data) => {
      console.log("📡 Datos obtenidos:", data);

      if (data.testState === 4 && !datosSeteados) {
        setResultados((prev) => ({
          ...prev,
          [zonaSeleccionada]: {
            ping: parseFloat(data.pingStatus) || 0,
            jitter: parseFloat(data.jitterStatus) || 0,
          },
        }));
        datosSeteados = true;
        t.abort();
        setEnProgreso(false);
      }
    };

    t.onerror = (err) => {
      console.error("❌ Error al medir:", err);
      setEnProgreso(false);
    };

    t.onend = () => {
      console.log("✅ Test finalizado");
      setEnProgreso(false);
    };

    t.start();
  };

  const recomendarUbicacion = () => {
    if (Object.keys(resultados).length < 2) {
      setRecomendacion(
        "⚠️ Medí al menos dos zonas para obtener una recomendación."
      );
      return;
    }

    const mejor = Object.entries(resultados).sort(([, a], [, b]) => {
      return a.ping + a.jitter - (b.ping + b.jitter);
    })[0];

    setRecomendacion(
      `📶 Mejor ubicación: ${mejor[0]} (Ping: ${mejor[1].ping} ms, Jitter: ${mejor[1].jitter} ms)`
    );
  };

  const reiniciarAnalisis = () => {
    setResultados({});
    setRecomendacion("");
    setZonaSeleccionada("");
  };

  const eliminarZona = (zona) => {
    const nuevosResultados = { ...resultados };
    delete nuevosResultados[zona];
    setResultados(nuevosResultados);
  };

  return (
    <div className=" p-6 rounded-lg  mx-auto text-white">
      <div className="text-center">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-4 text-center">
          <select
            value={zonaSeleccionada}
            onChange={(e) => setZonaSeleccionada(e.target.value)}
            className="p-2 rounded bg-gray-800 text-white border border-gray-600 w-full md:w-auto"
          >
            <option value="">Seleccionar zona...</option>
            {ZONAS.map((zona, idx) => (
              <option key={idx} value={zona}>
                {zona}
              </option>
            ))}
          </select>

          <button
            onClick={medirZona}
            disabled={!zonaSeleccionada || enProgreso}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Medir conexión
          </button>
        </div>
      </div>

      {enProgreso && (
        <p className="mt-4 text-yellow-300 font-semibold">
          ⏳ Midiendo conexión...
        </p>
      )}

      {Object.keys(resultados).length > 0 && (
        <div className="mt-6 text-left">
          <h3 className="font-semibold text-lg mb-2">Resultados:</h3>
          <ul className="space-y-2">
            {Object.entries(resultados).map(([zona, datos]) => (
              <li
                key={zona}
                className="bg-gray-800 p-3 rounded flex justify-between items-center"
              >
                <span>
                  <strong>{zona}:</strong> Ping: {datos.ping} ms | Jitter:{" "}
                  {datos.jitter} ms
                </span>
                <button
                  onClick={() => eliminarZona(zona)}
                  className="text-red-400 hover:text-red-600 font-bold text-lg"
                  title="Eliminar resultado"
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 text-center flex flex-col items-center gap-4">
        <button
          onClick={recomendarUbicacion}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Recomendar ubicación
        </button>

        <button
          onClick={reiniciarAnalisis}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Reiniciar análisis
        </button>

        {recomendacion && (
          <p className="mt-4 text-lg text-blue-300 font-medium">
            {recomendacion}
          </p>
        )}
      </div>
    </div>
  );
};

export default WifiScanner;
