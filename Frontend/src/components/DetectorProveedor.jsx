import React, { useEffect, useState } from "react";

const DetectorProveedor = () => {
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://ipwhois.app/json/")
      .then((res) => res.json())
      .then((data) => setDatos(data))
      .catch(() => setError("No se pudo obtener la información de red."));
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-xl mx-auto text-center">
      <h3 className="text-xl lg:text-2xl font-bold mb-4 text-fondo">Tu conexión actual</h3>

      {error && <p className="text-red-600">{error}</p>}

      {datos && (
        <div className="space-y-2 text-gray-700">
          <p>
            <strong>Proveedor (ISP):</strong> {datos.isp}
          </p>
          <p>
            <strong>IP pública:</strong> {datos.ip}
          </p>
          <p>
            <strong>Ciudad:</strong> {datos.city}
          </p>
          <p>
            <strong>Región:</strong> {datos.region}
          </p>
          <p>
            <strong>País:</strong> {datos.country}
          </p>
        </div>
      )}
    </div>
  );
};

export default DetectorProveedor;
