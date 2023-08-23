import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import Alert from "./Alert";

const FormProyecto = () => {

    const [id, setId] = useState(null);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaEntrega, setFechaEntrega] = useState('');
    const [cliente, setCliente] = useState('');

    const {mostrarAlerta, alerta, submitProyecto, proyecto} = useProyectos();

    const params = useParams();

    useEffect(() => {
        if(params.id){
            setId(proyecto._id)
            setNombre(proyecto.nombre)
            setDescripcion(proyecto.descripcion)
            setFechaEntrega(proyecto.fechaEntrega?.split('T') [0])
            setCliente(proyecto.cliente)
        }
    }, [params])

    const handleSubmit = async e => {
        e.preventDefault();

        if([nombre, descripcion, fechaEntrega, cliente].includes('')) {
            mostrarAlerta({
                msg: 'Todos los Campos son Obligatorios',
                error: true
            })

            return
        } 
        //Pasar los datos al provider
        await submitProyecto({id, nombre, descripcion, fechaEntrega, cliente})

        setId(null);
        setNombre('');
        setDescripcion('');
        setFechaEntrega('');
        setCliente('');
    }

    const {msg} = alerta

  return (
    <>
        <form className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow-lg"
            onSubmit={handleSubmit}
        >

            {msg && <Alert alerta={alerta}/>}

            <div className="mb-5">
                <label 
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="nombre"
                >Nombre Proyecto </label>  

                <input 
                    id="nombre"
                    type="text"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounde-md"
                    placeholder="Nombre del Proyecto"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    />
            </div>

            <div className="mb-5">
                <label 
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="descripcion"
                >Descripción</label>  

                <input 
                    id="descripcion"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounde-md"
                    placeholder="Descripcion del Proyecto"
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                    />
            </div>

            <div className="mb-5">
                <label 
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="fecha-entrega"
                >Fecha de Entrega de Proyecto </label>  

                <input 
                    id="fecha-entrega"
                    type="date"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounde-md"
                    value={fechaEntrega}
                    onChange={e => setFechaEntrega(e.target.value)}
                    />
            </div>

            <div className="mb-5">
                <label 
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="cliente"
                >Nombre Cliente </label>  

                <input 
                    id="cliente"
                    type="text"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounde-md"
                    placeholder="Nombre del Proyecto"
                    value={cliente}
                    onChange={e => setCliente(e.target.value)}
                    />
            </div>

            <input
                type="submit"
                value={id ? "Actualizar Proyecto" : "Crear Proyecto"}
                className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
            />

        </form>
    </>
  )
}

export default FormProyecto