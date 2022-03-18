import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase/firebaseConfig'

export const useObtenerGasto = (id) => {
  const [gasto, setGasto] = useState('')
  const [idGasto, setIdGasto] = useState('')
  let navigate = useNavigate()

  useEffect(async () => {
    const docRef = doc(db, 'gastos', id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      setGasto(docSnap.data())
      setIdGasto(docSnap.id)
    } else {
      return navigate('/lista')
    }
  }, [id, navigate])

  return [gasto,idGasto]
}
