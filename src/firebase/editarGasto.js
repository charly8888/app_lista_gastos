import { db } from './firebaseConfig'

import { updateDoc, doc } from 'firebase/firestore'

const editarGasto = async ({ id, categoria, descripcion, cantidad, fecha }) => {

console.log(id, categoria, descripcion, cantidad, fecha)

  return await updateDoc(doc(db, 'gastos', id), {
    categoria,
    descripcion,
    cantidad: Number(cantidad),
    fecha,
  })
}

export default editarGasto
