import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Header, Titulo, ContenedorHeader } from '../elements/Header'
import Boton from '../elements/Boton'
import {
  Formulario,
  Input,
  ContenedorBoton,
} from '../elements/ElementosDeFormularios'
import { ReactComponent as SvgLogin } from '../images/registro.svg'
import styled from 'styled-components'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/firebaseConfig'
import { useNavigate } from 'react-router-dom'
import Alerta from '../elements/Alerta'

const Svg = styled(SvgLogin)`
  width: 100%;
  max-height: 6.25rem; /* 100px */
  margin-bottom: 1.25rem; /* 20px */
`
const RegistroUsuarios = () => {
  const navigate = useNavigate()
  const [correo, setCorreo] = useState('')
  const [contraseña, setContraseña] = useState('')
  const [contraseña2, setContraseña2] = useState('')
  const [estadoAlerta, setEstadoAlerta] = useState(false)
  const [alerta, setAlerta] = useState({})

  const handleChange = (e) => {
    switch (e.target.name) {
      case 'email':
        setCorreo(e.target.value)
        break
      case 'password':
        setContraseña(e.target.value)
        break
      case 'password2':
        setContraseña2(e.target.value)
        break
      default:
        break
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
    if (correo === '' || contraseña === '' || contraseña2 === '') {
      setEstadoAlerta(true)
      setAlerta({
        tipo: 'error',
        mensaje: 'Rellene los datos',
      })
      return
    }
    if (contraseña !== contraseña2) {
      setEstadoAlerta(true)
      setAlerta({
        tipo: 'error',
        mensaje: 'Error, las contraseñas no son iguales',
      })
      return
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        correo,
        contraseña
      )
      console.log('usuario registrado con exito', result)

      navigate('/')
    } catch (err) {
      setEstadoAlerta(true)
      let mensaje
      switch (err.code) {
        case 'auth/weak-password':
          mensaje = 'La contraseña tiene que ser de al menos 6 caracteres.'
          break
        case 'auth/email-already-in-use':
          mensaje =
            'Ya existe una cuenta con el correo electrónico proporcionado.'
          break
        case 'auth/invalid-email':
          mensaje = 'El correo electrónico no es válido.'
          break
        default:
          mensaje = 'Hubo un error al intentar crear la cuenta.'
          break
      }
      setAlerta({tipo:"error", mensaje: mensaje})
    }
  }
  return (
    <>
      <Helmet>
        <title>Crear Cuenta</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Crear Cuenta</Titulo>
          <div>
            <Boton to="/iniciar-sesion">Iniciar Sesión</Boton>
          </div>
        </ContenedorHeader>
      </Header>
      <Formulario onSubmit={handleSubmit}>
        <Svg />
        <Input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          onChange={handleChange}
          value={correo}
        />
        <Input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
          value={contraseña}
        />
        <Input
          type="password"
          name="password2"
          placeholder="Repetir Contraseña"
          onChange={handleChange}
          value={contraseña2}
        />
        <ContenedorBoton>
          <Boton as="button" primario type="submit">
            Crear Cuenta
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

export default RegistroUsuarios
