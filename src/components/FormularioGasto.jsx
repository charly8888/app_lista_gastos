import {
  ContenedorFiltros,
  Formulario,
  Input,
  InputGrande,
  ContenedorBoton,
} from '../elements/ElementosDeFormularios'
import React, { useState } from 'react'
import Boton from '../elements/Boton'
import { ReactComponent as IconoPlus } from '../images/plus.svg'

const FormularioGasto = () => {
  const [inputDescricion, setInputDescricion] = useState('')
  const [inputCantidad, setInputCantidad] = useState('')

  const handleChange = (e) => {
    if (e.target.name === 'descripcion') {
      setInputDescricion(e.target.value)
    } else if (e.target.name === 'cantidad') {
      setInputCantidad(e.target.value.replace(/[^0-9.]/g, ''))
    }
  }
  return (
    <Formulario>
      <ContenedorFiltros>
        <p>Select</p>
        <p>Date picker</p>
      </ContenedorFiltros>
      <div>
        <Input
          type="text"
          name="descripcion"
          id="descripcion"
          placeholder="Descripción "
          value={inputDescricion}
          onChange={handleChange}
        />
        <InputGrande
          type="text"
          name="cantidad"
          id="cantidad"
          placeholder="$0.00"
          value={inputCantidad}
          onChange={handleChange}
        />
      </div>
      <ContenedorBoton>
        <Boton as="button" primario conIcono type="submit">
          Agregar gasto <IconoPlus />
        </Boton>
      </ContenedorBoton>
    </Formulario>
  )
}

export default FormularioGasto