import { daysToWeeks } from 'date-fns/esm'
import { ReactComponent as IconComida } from '../images/cat_comida.svg'
import { ReactComponent as IconCompras } from '../images/cat_compras.svg'
import { ReactComponent as IconCuentasYPagos } from '../images/cat_cuentas-y-pagos.svg'
import { ReactComponent as IconDiversion } from '../images/cat_diversion.svg'
import { ReactComponent as IconHogar } from '../images/cat_hogar.svg'
import { ReactComponent as IconRopa } from '../images/cat_ropa.svg'
import { ReactComponent as IconSalud } from '../images/cat_salud-e-higiene.svg'
import { ReactComponent as IconTransporte } from '../images/cat_transporte.svg'

const IconoCategoria = ({ id }) => {
  switch (id) {
    case 'comida':
      return <IconComida />
    case 'compras':
      return <IconCompras />
    case 'cuentas y pagos' :
      return <IconCuentasYPagos />
    case 'diversion':
      return <IconDiversion />
    case 'hogar':
      return <IconHogar />
    case 'ropa':
      return <IconRopa />
    case 'salud e higiene':
      return <IconSalud />
    case 'transporte':
      return <IconTransporte />
    default:
      break
  }
}

export default IconoCategoria
