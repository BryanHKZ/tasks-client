import React, { useReducer } from "react";
import proyectoContext from "./proyectoContext";
import { proyectoReducer } from "./proyectoReducer";
import clienteAxios from "../../config/axios"

import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTO,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO,
  PROYECTO_ERROR
} from "../../types";

const ProyectoState = (props) => {

  const initialState = {
    formulario: false,
    errorFormulario: false,
    proyectoSeleccionado: null,
    mensaje: null,
    proyectos: [],
  };

  const [state, dispatch] = useReducer(proyectoReducer, initialState);

  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO,
    });
  };

  const obtenerProyectos = async () => {
    try {
      const resultado = await clienteAxios.get("/api/proyectos");
      dispatch({
        type: OBTENER_PROYECTOS,
        payload: resultado.data,
      });
    } catch (error) {
      const alerta = {
        msg: "Hubo un error",
        categoria: "alerta-error"
      }
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta
      })
    }
  };

  const agregarProyecto = async (p) => {
    const resultado = await clienteAxios.post("/api/proyectos", p);
    // console.log(resultado);
    dispatch({
      type: AGREGAR_PROYECTO,
      payload: resultado.data,
    });
    try {
      
    } catch (error) {
      const alerta = {
        msg: "Hubo un error",
        categoria: "alerta-error"
      }
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta
      })
    }
  };

  const mostrarError = () => {
    dispatch({
      type: VALIDAR_FORMULARIO
    })
  }

  const proyectoActual = (proyectoId) => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: proyectoId
    })
  }

  const eliminarProyecto = async (proyectoId) => {
    try {
      await clienteAxios.delete("/api/proyectos/"+proyectoId);
      dispatch({
        type: ELIMINAR_PROYECTO,
        payload: proyectoId
      })
    } catch (error) {
      const alerta = {
        msg: "Hubo un error",
        categoria: "alerta-error"
      }
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta
      })
    }
  }

  return (
    <proyectoContext.Provider
      value={{
        formulario: state.formulario,
        proyectos: state.proyectos,
        errorFormulario: state.errorFormulario,
        proyectoSeleccionado: state.proyectoSeleccionado,
        mensaje: state.mensaje,
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        mostrarError,
        proyectoActual,
        eliminarProyecto
      }}
    >
      {props.children}
    </proyectoContext.Provider>
  );
};

export default ProyectoState;
