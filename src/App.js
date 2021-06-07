import React, { useState, useEffect } from "react";
import Pregunta from "./componentes/Pregunta";
import Formulario from "./componentes/Formulario";
import Listado from "./componentes/Listado";
import ControlPresupuesto from "./componentes/ControlPresupuesto";

function App() {

  

  //definir el state
  const [presupuesto, guardarPresupuesto] = useState(0);
  const [restante, guardarRestante] = useState(0);
  const [mostrarPregunta, actualizarPregunta] = useState(true); //la 1 vez que abrimos queremos que se muestre
  const [gastos, guardarGastos] = useState([]);
  const [gasto, guardarGasto] = useState({});
  const [crearGasto, guardarCrearGasto ] = useState(false);

  //useEffect que actualiza el restante, ponele que seria el mount del liveview
  useEffect(() => {
    if(crearGasto){

      //agregar el nuevo presupuesto
      guardarGastos([
        ...gastos, 
        gasto]);
        
        //resta del presupuesto actual
        const presupuestoRestante = restante - gasto.cantidad
        guardarRestante(presupuestoRestante)

        //resetear a false
      guardarCrearGasto(false)
    }
  }, [gasto])


  //cuando agreguemos un nuevo gasto


  return (
    <div className="container">
      <header>
        <h1>Gasto Semanal</h1>
        <div className="contenido-principal contenido">
          {mostrarPregunta ? (        //si se cumple, muestra un componente, sino otro
            <Pregunta
              guardarPresupuesto={guardarPresupuesto}
              guardarRestante={guardarRestante}
              actualizarPregunta={actualizarPregunta}
            ></Pregunta>
          ) : (
            <div className="row">
              <div className="one-half column">

                <Formulario 
                guardarGasto={guardarGasto}
                guardarCrearGasto={guardarCrearGasto}
                ></Formulario>

              </div>
              <div className="one-half column">

                <Listado gastos={gastos}></Listado>

                <ControlPresupuesto
                presupuesto = {presupuesto}
                restante = {restante}
                ></ControlPresupuesto>

              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
