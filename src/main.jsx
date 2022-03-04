import React, { useContext } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import WebFont from 'webfontloader'
import Contenedor from './elements/Contenedor'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EditarGasto from './components/EditarGasto'
import GastosPorCategoria from './components/GastosPorCategoria'
import InicioSesion from './components/InicioSesion'
import ListaDeGastos from './components/ListaDeGastos'
import RegistroUsuarios from './components/RegistroUsuarios'
import { Helmet } from 'react-helmet'
import favicon from './images/logo.png'
import Fondo from './elements/Fondo'
import { AuthContext, AuthProvider, useAuth } from './contextos/AuthContext'

WebFont.load = {
  google: {
    families: ['Work Sans:400, 500, 700', 'sans serif'],
  },
}

function Index() {

  return (
    <>
      <Helmet>
        <link rel="shorcut icon" href={favicon} type="image/x-icon" />
        <title>Hola Mundo</title>
      </Helmet>
      <AuthProvider>
        <BrowserRouter>
          <Contenedor>
            <Routes>
              <Route path="/iniciar-sesion" element={<InicioSesion />} />
              <Route path="/crear-cuenta" element={<RegistroUsuarios />} />

              <Route path="/" element={<App />} />
              <Route path="/categorias" element={<GastosPorCategoria />} />

              <Route path="/lista" element={<ListaDeGastos />} />
              <Route path="/editar/:id" element={<EditarGasto />} />
              <Route path="*" element={<InicioSesion />} />
              
            </Routes>
          </Contenedor>
        </BrowserRouter>
      </AuthProvider>

      <Fondo />
    </>
  )
}

ReactDOM.render(<Index />, document.getElementById('root'))
