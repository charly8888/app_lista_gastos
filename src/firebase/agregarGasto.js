import { db } from './firebaseConfig'

import { collection, addDoc } from 'firebase/firestore'

const agregarGasto = async ( props ) => {
  console.log(props)
  return await addDoc(collection(db, 'gastos'), {
    ...props,
  }
  )
  
}

export default agregarGasto
