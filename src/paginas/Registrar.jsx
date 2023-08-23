import { useState } from "react"
import { Link } from "react-router-dom"
import Alert from "../components/Alert";
import clienteAxios from "../config/clienteAxios";

const Registrar = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetirPAssword, setRepetirPassword] = useState('');
    const [alerta, setAlerta] = useState({})

    const handleSubmit = async e => {
      e.preventDefault();

      if([nombre, email, password, repetirPAssword].includes('')) {
        setAlerta({
          msg: 'Todos los Campos son obligatorios',
          error: true,
        })
        return
      }

      if(password !== repetirPAssword) {
        setAlerta({
          msg: 'Contraseñas ingresadas no coinciden',
          error: true,
        })
       return
      }
      if(password.length < 6) {
        setAlerta({
          msg: 'Contaseña muy corta, ingresa al menos 6 caracteres',
          error: true,
        })
        return
      }
      setAlerta({})

      //Crear Usuario en api

      try {
        const {data} = await clienteAxios.post(`/usuarios`, {
          nombre, email, password
        })

        setAlerta({
          msg: data.msg,
          error: false,
        })

        setNombre('')
        setEmail('')
        setPassword('')
        setRepetirPassword('')
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        })
      }
    }

    const {msg} = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Crea tu Cuenta y Administra tus <span          className="text-slate-700"> proyectos </span>
      </h1>
        {msg && <Alert alerta={alerta}/>}
      <form
        onSubmit={handleSubmit}
        className="my-10 bg-white shadow rounded-lg p-10 px-10 py-10">

      <div>
          <label 
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="nombre"
          >
              Nombre
            </label>
          <input 
            id="nombre"
            type="text"
            placeholder="Tu nombre"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50 mb-3"
            value={nombre}
            onChange={ e=> setNombre(e.target.value)}
          />
        </div>

        <div>
          <label 
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >
              Email
            </label>
          <input 
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50 mb-3"
            value={email}
            onChange={ e=> setEmail(e.target.value)}
          />
        </div>

        <div>
          <label 
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
          >
              Password
            </label>
          <input 
            id="password"
            type="password"
            placeholder="Password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50 mb-3"
            value={password}
            onChange={ e=> setPassword(e.target.value)}
          />
        </div>

        <div>
          <label 
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password2"
          >
              Repetir Password
            </label>
          <input 
            id="password2"
            type="password"
            placeholder="Repetir tu Password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50 mb-3"
            value={repetirPAssword}
            onChange={ e=> setRepetirPassword(e.target.value)}
          />
        </div>

        <input 
          type="submit"
          value="Crear Cuenta"
          className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded hover:cursor-pointer
          hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
          <Link
            to="/"
            className='block text-center my-5 text-slate-500 uppercase text-sm'
          >
            ¿Ya tienes una cuenta? Inicia Sesión?
          </Link>

          <Link
            to="/olvide-password"
            className='block text-center my-5 text-slate-500 uppercase text-sm'
          >
            Olvidé mi Password
          </Link>
      </nav>
    </>
  )
}

export default Registrar