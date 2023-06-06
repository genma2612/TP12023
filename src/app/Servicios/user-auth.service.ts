import { Firestore, addDoc, collection, doc, setDoc, updateDoc } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private auth: Auth, private firestore: Firestore) { }


  registrar({ correo, password }: any) {
    return createUserWithEmailAndPassword(this.auth, correo, password);
  }

  ingresar({ correo, password }: any) {
    return signInWithEmailAndPassword(this.auth, correo, password);
  }

  salir() {
    return signOut(this.auth);
  }

  guardarDocumentoEnFirestore(user: any) { //Para guardar en colección con el mismo ID del usuario
    let usuario = {mail:user.email, uid:user.uid, rol:'usuario'};
    const docRef = doc(this.firestore, `users/${user.uid}`)
    return setDoc(docRef, usuario, { merge: true});

    //const userRef = collection(this.firestore, `users`); //Esto agrega a colección sin ID específica
    //return addDoc(userRef, usuario);

  }


}
