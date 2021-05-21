import React, { useContext, useEffect, useState } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const FormTarea = () => {
  const proyectosContext = useContext(proyectoContext);
  const { proyectoSeleccionado } = proyectosContext;

  const tareasContext = useContext(tareaContext);
  const {
    errorTarea,
    agregarTarea,
    validarTarea,
    obtenerTareasProyecto,
    tareaActual,
    actualizarTarea
  } = tareasContext;

  const [tarea, guardarTarea] = useState({
    nombre: "",
  });

  useEffect(() => {
    if (tareaActual !== null) {
      guardarTarea(tareaActual);
    } else {
      guardarTarea({ nombre: "" });
    }
  }, [tareaActual]);

  if (!proyectoSeleccionado) return null;

  const [proyectoActual] = proyectoSeleccionado;

  const { nombre } = tarea;

  const handleChange = (e) => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitTarea = (e) => {
    e.preventDefault();

    if (nombre.trim() === "") {
      validarTarea();
      return;
    }

    if (tareaActual === null) {
      tarea.proyectoId = proyectoActual._id;
      agregarTarea(tarea);
    } else {
      actualizarTarea(tarea);
    }

    obtenerTareasProyecto(proyectoActual._id);

    guardarTarea({
      nombre: "",
    });
  };

  return (
    <div className="formulario">
      <form onSubmit={onSubmitTarea}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre de la tarea..."
            name="nombre"
            value={nombre}
            onChange={handleChange}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            value={tareaActual ? "Editar Tarea" : "Agregar Tarea"}
            className="btn btn-block btn-primario"
          />
        </div>
      </form>
      {errorTarea ? (
        <p className="mensaje error">Debes ingresar un nombre para la tarea</p>
      ) : null}
    </div>
  );
};

export default FormTarea;
