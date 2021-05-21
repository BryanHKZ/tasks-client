import React, { useContext, useEffect } from "react";
import Proyecto from "./Proyecto";
import AlertaContext from "../../context/alertas/alertaContext";
import proyectoContext from "../../context/proyectos/proyectoContext";

const ListadoProyectos = () => {
  const proyectosContext = useContext(proyectoContext);
  const { mensaje, proyectos, obtenerProyectos } = proyectosContext;
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  useEffect(() => {
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    obtenerProyectos();
    //eslint-disable-next-line
  }, [mensaje]);

  if (proyectos.length === 0)
    return <p>No hay proyectos, comienza creando uno</p>;

  return (
    <ul className="listado-proyectos">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      {proyectos.map((p) => (
        <Proyecto proyecto={p} key={p._id} />
      ))}
    </ul>
  );
};

export default ListadoProyectos;