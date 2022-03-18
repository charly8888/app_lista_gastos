import { getUnixTime, startOfMonth } from 'date-fns'
import { endOfMonth } from 'date-fns/esm'
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { useState, useEffect } from 'react/'
import { useAuth } from '../contextos/AuthContext'
import { db } from '../firebase/firebaseConfig'

const useObtenerGastosDelMes = () => {
  const [gastos, setGastos] = useState([])
  const { usuario } = useAuth()
  const coleccionDeGastos = collection(db, 'gastos')

  useEffect(() => {
    let inicioMes = getUnixTime(startOfMonth(new Date()))
    let finMes = getUnixTime(endOfMonth(new Date()))

    if (usuario) {
      const q = query(
        coleccionDeGastos,
        where('usuario', '==', usuario.uid),
        where('fecha', '>=', inicioMes),
        where('fecha', '<=', finMes),
        orderBy('fecha', 'desc'),
        limit(10)
      )
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setGastos(
          snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id }
          })
        )
      })
      return unsubscribe
    }
  }, [usuario])

  return [gastos]
}

export default useObtenerGastosDelMes
