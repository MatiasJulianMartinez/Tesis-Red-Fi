import MainButton from "../ui/MainButton";

const BotonAgregarReseña = ({ usuario, onAbrirModalReseña, setAlerta }) => {
  const handleClick = () => {
    if (!usuario) {
      setAlerta("Debes iniciar sesión para agregar una reseña");
      return;
    }
    onAbrirModalReseña();
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <MainButton
        onClick={handleClick}
        disabled={!usuario}
        variant={usuario ? "accent" : "disabled"}
        className="w-full"
        title={usuario ? "Agregar reseña" : "Debes iniciar sesión para agregar una reseña"}
      >
        Agregar reseña
      </MainButton>
      {!usuario && (
        <p className="text-sm text-white/60 italic animate-fade-in">
          Necesitas iniciar sesión para acceder a esta función.
        </p>
      )}
    </div>
  );
};

export default BotonAgregarReseña;
