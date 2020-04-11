import React, {Fragment, useState} from 'react';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    //  Crear State de Citas

    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''


    });


    // funcion para corregir los errores

    const [error, actualizarError] = useState(false)

    // funcion que se ejecuta cada escribe en input (EL E se pone para los eventos)
    const actualizarState = e => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    // extraer los datos para cuando envias formulario
    const {mascota, propietario, fecha, hora, sintomas}  = cita; 

    // cuando el usuario presiona agregar cita

    const submitCita = e =>{
        e.preventDefault();

        if(mascota.trim() ==='' || propietario.trim() ==='' || fecha.trim() === '' || hora.trim() === ''){

            actualizarError(true);
            return;
    
        }

        actualizarError(false);

        // Asignar un Id
        cita.id = uuid(); 

        // Crear una cita
         crearCita(cita);

         //Reiniciar Cita
         actualizarCita({
             mascota: '',
             propietario:'',
             fecha: '',
             hora:'',
             sintomas:'' 
         })
    }

    // Validar 

    return ( 
         <Fragment>
             <h2>Crear Cita</h2>
             {error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}
             <form
             onSubmit={submitCita}
             >
                 <label>Nombre Mascota</label>
                 <input
                     type="text"
                     name="mascota"
                     className="u-full-width"
                     placeholder="Nombre Mascota"
                     onChange={actualizarState}
                     value={mascota}
                 />

                <label>Nombre Dueño</label>
                    <input
                        type="text"
                        name="propietario"
                        className="u-full-width"
                        placeholder="Nombre Dueño Mascota"
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

                <label>Nombre Dueño</label>
                    <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                    value={sintomas}
                    ></textarea>

                <button type="submit" className="u-full-width button-primary">Agregar Cita</button>
             </form>
             </Fragment>
     );
}

Formulario.propTypes = {
    crearCita:PropTypes.func.isRequired
}

 
export default Formulario;