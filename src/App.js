import React,{Fragment,useState,useEffect} from 'react'; 
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

//citas en local storage
let citasIniciales = JSON.parse(localStorage.getItem('citas')) ;

if(!citasIniciales){
  citasIniciales = []; 
}

  // Arreglo de citas
  const [citas, guardarCitas] = useState([citasIniciales]);

  //  Use Effect para las operaciones cuando el state cambie
  useEffect( () => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas')) ;
    if(citasIniciales){
       localStorage.setItem('citas',JSON.stringify(citas));
    }else{
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas]);

  // Funcion que tome las citas actuales y agrege una nueva
  const crearCita = cita =>{
      guardarCitas([
        ...citas,
        cita
      ])
  }

  // Funcion que elimina cita por id
  const eliminarCita = id =>{
     const nuevasCitas = citas.filter(cita => cita.id !== id);
     guardarCitas(nuevasCitas);
  }

  // Mensaje Condicional
  const titulo = citas.length === 0 ? 'NO hay Citas' : 'Administra tus Citas';


  return (
    <Fragment>
    <h1>Administrador de  Citas</h1>

    <div className="container">
      <div className="row">
        <div className="one-half column">
          <Formulario
          crearCita={crearCita}
           />
        </div>
        <div className="one-half column">
         <h2>{titulo}</h2>
         {citas.map(cita => (
          <Cita 
             key={cita.id}
             cita={cita}
             eliminarCita={eliminarCita}
          />
         ))}
        </div>
      </div>
    </div>

    </Fragment>
  );
}

export default App;
