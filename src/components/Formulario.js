import React, { Fragment, useState } from "react";
import shortid from "shortid";
import PropTypes from 'prop-types';



const Formulario = ({ crearCita }) => {

    //Crear State de Citas

    const [cita, actualizarCitas] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });


    const [error, actualizarError] = useState(false);

    //Funcion que se ejecuta cada que se actualiza un input

    const actualizarState = e => {
            actualizarCitas({

                ...cita,
                [e.target.name]: e.target.value
            })
    }

    //Extraer Los Valores

    const { mascota, propietario, fecha, hora, sintomas} = cita;

    //Cuando el usuario Presiona para enviar cita
    const submitcita = e =>{
        
        e.preventDefault();

        //Validar 
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '' ){
          actualizarError(true);
          return;
        }
        // Eliminar mensaje previo
        actualizarError(false);

        //Asignar id
        cita.id = shortid.generate();
        

        //Crear la cita
        crearCita(cita);

        //reinicia el Form
        actualizarCitas({
          mascota: '',
          propietario: '',
          fecha: '',
          hora: '',
          sintomas: ''
        })


    }

  return (
    <Fragment>
      <h2>Crear Cita</h2>
      { error ? <p className="alerta-error">Todos los Campos son Obligatorios</p>   :null }
      <form
        onSubmit={submitcita}
      >
        <label> Nombre Mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre de la  Mascota"
          onChange={actualizarState}
          value={mascota}
        />
        <label> Nombre Propietario</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre del Propietario de la Mascota"
          onChange={actualizarState}
          value={propietario}
        />
        <label>Fecha</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={actualizarState}
          value={fecha}        
        />
        <label>Hora</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={actualizarState}
          value={hora}        
        />
        <label>Sintomas</label>
        <textarea 
            className="u-full-width"
            name="sintomas"
            onChange={actualizarState}
            value={sintomas }
        ></textarea>

        <button
            className="u-full-width button-primary"

        >Agregar Citas</button>
          
      </form>
    </Fragment>
  );
};

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired,
}

export default Formulario;
