import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { useAuth } from '../contextos/AuthContext'
import { db } from '../firebase/firebaseConfig'

export default function useObtenerGastos() {
  const { usuario } = useAuth()
  const [gastos, setGastos] = useState([])
  const coleccionDeGastos = collection(db, 'gastos')
  const [ultimoGasto, setUltimoGasto] = useState(0)
  const [hayMasPorCargar, setHayMasPorCargar] = useState(false)
  // console.log(usuario.uid)

  const q = query(
    coleccionDeGastos,
    where('usuario', '==', usuario.uid),
    orderBy('fecha', 'desc'),
    limit(10),
    )
    const obtenerMasGastos = () => {
      const cargarMas = query(
        coleccionDeGastos,
        where('usuario', '==', usuario.uid),
        orderBy('fecha', 'desc'),
        limit(10),
        startAfter(ultimoGasto)
    )
    onSnapshot(cargarMas, (snapshot) => {
      if (snapshot.docs.length > 0) {
        setUltimoGasto(snapshot.docs[snapshot.docs.length - 1])
        setGastos(
          gastos.concat(
            snapshot.docs.map((gasto) => {
              return { ...gasto.data(), id: gasto.id }
            })
          )
        )
      } else setHayMasPorCargar(false)
    })
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.docs.length > 0) {
        setUltimoGasto(snapshot.docs[snapshot.docs.length - 1])
        setHayMasPorCargar(true)
      } else {
        setHayMasPorCargar(false)
      }

      setGastos(
        snapshot.docs.map((gasto) => {
          return { ...gasto.data(), id: gasto.id }
        })
      )
    })
    return unsubscribe
  }, [usuario])
  return [gastos, obtenerMasGastos, hayMasPorCargar]
}
