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
    return createUserWithEmailAndPassword(this.auth, correo, password)
      .then(user => this.guardarEnFirestore(user));
  }

  ingresar({ correo, password }: any) {
    return signInWithEmailAndPassword(this.auth, correo, password);
  }

  salir() {
    return signOut(this.auth);
  }

  guardarEnFirestore(user: any) {
    let objeto = { correo: user.email, uid: user.uid };
    console.log(user);
    //const docRef = doc(this.firestore, 'users', '111112345');
    //setDoc(docRef, objeto, { merge: true });
  }


}
