import React, { useReducer } from "react";
import TareaContext from "./tareaContext";
import { tareaReducer } from "./tareaReducer";
import clienteAxios from "../../config/axios";

import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
} from "../../types";

const TareaState = (props) => {
  const initialState = {
    tareasProyecto: [],
    tareaActual: null,
    errorTarea: false,
  };

  const [state, dispatch] = useReducer(tareaReducer, initialState);

  const obtenerTareasProyecto = async (proyectoId) => {
    try {
      const resultado = await clienteAxios.get("/api/tareas", {
        params: { proyectoId },
      });
      dispatch({
        type: TAREAS_PROYECTO,
        payload: resultado.data,
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const agregarTarea = async (tarea) => {
    try {
      const resultado = await clienteAxios.post("/api/tareas", tarea);
      console.log(resultado);
      dispatch({
        type: AGREGAR_TAREA,
        payload: tarea,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA,
    });
  };

  const eliminarTarea = async (id, proyectoId) => {
    try {
      await clienteAxios.delete("/api/tareas/" + id, {
        params: { proyectoId },
      });
      dispatch({
        type: ELIMINAR_TAREA,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const actualizarTarea = async (tarea) => {
    try {
      const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
      
      dispatch({
        type: ACTUALIZAR_TAREA,
        payload: resultado.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const guardarTareaActual = (tarea) => {
    
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea,
    });
  };

  return (
    <TareaContext.Provider
      value={{
        tareasProyecto: state.tareasProyecto,
        errorTarea: state.errorTarea,
        tareaActual: state.tareaActual,
        obtenerTareasProyecto,
        agregarTarea,
        validarTarea,
        eliminarTarea,
        guardarTareaActual,
        actualizarTarea,
      }}
    >
      {props.children}
    </TareaContext.Provider>
  );
};

export default TareaState;
