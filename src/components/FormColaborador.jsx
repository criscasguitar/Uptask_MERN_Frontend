import { useState } from "react"
import useProyectos from "../hooks/useProyectos"
import Alert from "./Alert"

const FormColaborador = () => {

    const [email, setEmail] = useState('')
    const {mostrarAlerta, alerta, submitColaborador} = useProyectos()

    const handleSubmit = e => {
        e.preventDefault()

        if(email === '') {
            mostrarAlerta({
                msg: "El Email es obligatorio",
                error: true,
            })
            return
        }

        submitColaborador(email);
    }

    const {msg} = alerta

  return (
    <form
        className='bg-wite py-10 px-5 w-full md:w-1/2 rounded-lg shadow'
        onSubmit={handleSubmit}
    >
        {msg && <Alert alerta={alerta}/>}
        <div className='mb-5'>
            <label htmlFor="nombre"
                className='text-gray-700 uppercase font-bold text-sm'
            >
                Email Colaboradoror(a)
            </label>
            <input
                type='email'
                id='email'
                placeholder='Email del Colaborar(a)'
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
        </div>

        <input
            type='submit'
            className='bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded text-sm'
            value='Buscar Colaborador'
        />
    </form>
  )
}

export default FormColaborador