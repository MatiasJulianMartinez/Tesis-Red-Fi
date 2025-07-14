import { useState, useEffect, useRef } from "react";
import { IconX, IconSearch } from "@tabler/icons-react";
import { useBusquedaUbicacion } from "../../hooks/useBusquedaUbicacion";
import Input from "../ui/Input";
import MainButton from "../ui/MainButton";
import Alerta from "../ui/Alerta";

const BusquedaUbicacion = ({ boundsCorrientes, setAlerta, alerta, mapRef }) => {
  const {
    input,
    sugerencias,
    handleInputChange,
    handleBuscar,
    handleSeleccionarSugerencia,
    handleLimpiarBusqueda,
    setSugerencias,
  } = useBusquedaUbicacion(boundsCorrientes, setAlerta, mapRef);

  const [inputInvalido, setInputInvalido] = useState(false);
  const contenedorRef = useRef();

  useEffect(() => {
    const manejarClickAfuera = (e) => {
      if (contenedorRef.current && !contenedorRef.current.contains(e.target)) {
        setSugerencias([]);
      }
    };
    document.addEventListener("mousedown", manejarClickAfuera);
    return () => document.removeEventListener("mousedown", manejarClickAfuera);
  }, []);

  const handleBuscarClick = () => {
    if (!input.trim()) {
      setAlerta("Por favor ingresá una ubicación.");
      setInputInvalido(true);
      return;
    }
    setInputInvalido(false);
    handleBuscar();
  };

  return (
    <div className="space-y-4 relative">
      <div className="flex gap-2 relative" ref={contenedorRef}>
        <div className="relative flex-1">
          <Input
            label="Buscar ubicación"
            name="busqueda"
            value={input}
            onChange={(e) => {
              handleInputChange(e.target.value);
              if (inputInvalido) setInputInvalido(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleBuscarClick();
            }}
            placeholder="Buscar en Corrientes..."
            isInvalid={inputInvalido}
            endIconAction={
              input
                ? {
                    icon: (
                      <IconX
                        size={18}
                        className="text-white/60 hover:text-red-400 font-bold transition focus:outline-none duration-300"
                      />
                    ),
                    onClick: handleLimpiarBusqueda,
                    label: "Limpiar campo de búsqueda",
                  }
                : null
            }
          />

          {/* Sugerencias flotantes */}
          {input && sugerencias.length > 0 && (
            <ul className="absolute z-10 left-0 right-0 bg-fondo border border-white/10 rounded-lg mt-1 max-h-40 overflow-auto text-texto shadow-lg">
              {sugerencias.map((sug, index) => (
                <li
                  key={index}
                  onClick={() => handleSeleccionarSugerencia(sug)}
                  className="px-3 py-2 cursor-pointer hover:bg-white/10 transition"
                >
                  {sug.formatted}
                </li>
              ))}
            </ul>
          )}

          {/* Alerta si hay mensaje */}
          {alerta && (
            <div className="absolute top-full left-0 w-full mt-2 z-50">
              <Alerta
                mensaje={alerta}
                tipo="error"
                onCerrar={() => setAlerta("")}
                flotante
              />
            </div>
          )}
        </div>

        <MainButton
          onClick={handleBuscarClick}
          title="Buscar ubicación"
          type="button"
          variant="primary"
          className="self-end py-2.25"
          icon={IconSearch}
        />
      </div>
    </div>
  );
};

export default BusquedaUbicacion;
