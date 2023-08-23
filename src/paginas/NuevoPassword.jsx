import { useState, useEffect } from "react"
import {Link, useParams} from 'react-router-dom';
import clienteAxios from "../config/clienteAxios";
import Alert from "../components/Alert";


const NuevoPassword = () => {

  const params = useParams()
  const {token} = params
  
  const [password, setPassword] = useState('')
  const [tokenValido, setTokenValido] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [passwordModificado, setPasswordModificado] = useState(false);


  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/usuarios/olvide-password/${token}`);
        setTokenValido(true)
      } catch (error) {
        setAlerta({
           msg: error.response.data.msg,
           error: true    
        })
      }
    }
    comprobarToken()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault();

    if(password.length < 6) {
      setAlerta({
        msg: 'El Password debe de ser minimo de 6 caracteres',
        error: true
      })

      return
    }

    try {
      const url = `/usuarios/olvide-password/${token}`;

      const {data} = await clienteAxios.post(url, {password});

      setAlerta({
        msg: data.msg,
        error: false
      })
      setPasswordModificado(true)
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const {msg} = alerta
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Reestablece tu contraseña y no pierdas acceso a tus<span          className="text-slate-700"> proyectos </span>
      </h1>

        {msg && <Alert alerta={alerta}/>}

        {tokenValido && (
          <form 
            onSubmit={handleSubmit}
            className="my-10 bg-white shadow rounded-lg p-10 px-10 py-10">

      

          <div>
            <label 
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="password"
            >
               Nuevo Password
              </label>
            <input 
              id="password"
              type="password"
              placeholder="Escribe tu nueva contraseña"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50 mb-3"
              onChange={e => setPassword(e.target.value)}
            />
          </div>
  
          <input 
            type="submit"
            value="Guardar Nueva Contraseña"
            className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded hover:cursor-pointer
            hover:bg-sky-800 transition-colors"
          />
        </form>
        )}

          {passwordModificado && (
              <Link
              to="/"
              className='block text-center my-5 text-slate-500 uppercase text-sm'
            >
                  Inicia Sesión
                </Link>
            )}  
    </>
  )
}

export default NuevoPassword