import { useEffect } from "react"
import FormColaborador from "../components/FormColaborador"
import useProyectos from "../hooks/useProyectos"
import { useParams } from "react-router-dom"
import Alert from "../components/Alert"

const NuevoColaborador = () => {

    const {obtenerProyecto, proyecto, cargando, colaborador, agregarColaborador, alerta} = useProyectos();
    const params = useParams()

    useEffect(() => {
        obtenerProyecto(params.id)
    }, [])

    if(cargando) return (<div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-700 h-10 w-10"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-700 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                <div className="h-2 bg-slate-700 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-700 rounded"></div>
            </div>
          </div>
        </div>
      </div> )

      if(!proyecto?._id) return <Alert alerta={alerta}/>

  return (
    <>
        <h1 className='text-4xl font-black'>Añdir Colaborador(a) al Proyecto: {proyecto.nombre}</h1>

        <div className='mt-10 flex justify-center'>
            <FormColaborador/>
        </div>

        {cargando ? 'Cargando' : colaborador?._id && (
            <div className="flex justify-center mt-10">
                <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow w-full">
                    <h2 className="text-center mb-10 text-2xl font-bold">Resultado:</h2>

                    <div className="flex justify-between">
                        <p>{colaborador.nombre}</p>

                        <button 
                            type="button"
                            className="bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm hover:bg-slate-700"
                            onClick={() => agregarColaborador({
                                email: colaborador.email
                            })}
                        >
                            Agregar al Proyecto
                        </button>
                    </div>
                </div>
            </div>
        )}
    </>
  )
}

export default NuevoColaborador