import Boton from './Boton'
import { ReactComponent as IconoCerrarSesion } from '../images/log-out.svg'
import React from 'react'
import { auth } from '../firebase/firebaseConfig'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const BotonCerrarSesion = () => {
  const navigate = useNavigate()
  const cerrarSesion = async () => {
    try {
      await signOut(auth)
      navigate('/iniciar-sesion')
    } catch (err) {
      console.log(err)
    }
  }

  return ( 
    <Boton iconoGrande as="button" onClick={cerrarSesion}>
      <IconoCerrarSesion />
    </Boton>
  )
}

export default BotonCerrarSesion
