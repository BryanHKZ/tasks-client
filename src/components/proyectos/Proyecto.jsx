import React, { useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const Proyecto = ({ proyecto }) => {
  const proyectosContext = useContext(proyectoContext);
  const { proyectoActual } = proyectosContext;
  const tareasContext = useContext(tareaContext);
  const { obtenerTareasProyecto } = tareasContext;

  const seleccionarProyecto = (id) => {
    proyectoActual(id);
    obtenerTareasProyecto(id);
  };

  return (
    <li>
      <button
        type="button"
        onClick={() => seleccionarProyecto(proyecto._id)}
        className="btn btn-blank"
      >
        {proyecto.nombre}
      </button>
    </li>
  );
};

export default Proyecto;
