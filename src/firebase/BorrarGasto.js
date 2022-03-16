import { db } from './firebaseConfig'
import { doc, deleteDoc } from 'firebase/firestore'

export const borrarGasto = (id) => {
  deleteDoc(doc(db, 'gastos', id))
}
