import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Header, Titulo, ContenedorHeader } from '../elements/Header'
import Boton from '../elements/Boton'
import {
  Formulario,
  Input,
  ContenedorBoton,
} from '../elements/ElementosDeFormularios'
import { ReactComponent as SvgLogin } from '../images/login.svg'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Alerta from '../elements/Alerta'

const Svg = styled(SvgLogin)`
  width: 100%;
  max-height: 12.5rem; /* 100px */
  margin-bottom: 1.25rem; /* 20px */
`
const InicioSesion = () => {
  const navigate = useNavigate()
  const [correo, setCorreo] = useState('')
  const [contraseña, setContraseña] = useState('')
  const [estadoAlerta, setEstadoAlerta] = useState(false)
  const [alerta, setAlerta] = useState({})

  const handleChange = (e) => {
    if (e.target.name === 'email') {
      setCorreo(e.target.value)
    } else if (e.target.name === 'password') {
      setContraseña(e.target.value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEstadoAlerta(false)
    setAlerta({})
    //Comprobamos del lado del cliente que el correo sea válido
    const expressionRegex =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    if (!expressionRegex.test(correo)) {
      setEstadoAlerta(true)
      setAlerta({
        tipo: 'error',
        mensaje: 'Por favor, ingresa un correo electrónico valido',
      })
      return
    }

    if (correo === '' || contraseña === '') {
      setEstadoAlerta(true)
      setAlerta({
        tipo: 'error',
        mensaje: 'Rellene los datos',
      })
      return
    }

    try {
      const result = await signInWithEmailAndPassword(auth, correo, contraseña)
      console.log('Usuario logueado con exito', result)

      navigate('/')
    } catch (err) {
      console.log(err.code)
      setEstadoAlerta(true)
      let mensaje
      switch (err.code) {
        case 'auth/user-not-found':
          mensaje = 'No se encontró el usuario'
          break
        case 'auth/wrong-password':
          mensaje = 'La contraseña es incorrecta'
          break
        default:
          mensaje = 'Hubo un error al intentar iniciar sesion.'
          break
      }
      setAlerta({ tipo: 'error', mensaje: mensaje })
    }
  }
  return (
    <>
      <Helmet>
        <title>Iniciar Sesion </title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Iniciar Sesion</Titulo>
          <div>
            <Boton to="/crear-cuenta">Registrarse</Boton>
          </div>
        </ContenedorHeader>
      </Header>
      <Formulario onSubmit={handleSubmit}>
        <Svg />
        <Input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          value={correo}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={contraseña}
          onChange={handleChange}
        />

        <ContenedorBoton>
          <Boton as="button" primario type="submit">
            Iniciar Sesion
          </Boton>
        </ContenedorBoton>
      </Formulario>
      <Alerta
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        estadoAlerta={estadoAlerta}
        setEstadoAlerta={setEstadoAlerta}
      />
    </>
  )
}

export default InicioSesion
