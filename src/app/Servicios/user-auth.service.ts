import { Usuario } from './../Clases/usuario';
import { Firestore, addDoc, collection, doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  isLogged:boolean = false;

  constructor(private auth: Auth, private firestore: Firestore) { 
    this.auth.onAuthStateChanged(status => {
      if(status != null){
        this.isLogged = true;
      }
      else{
        this.isLogged = false;
      }
      this.hayUsuarioLogueado();
    })
  }


  registrar({ correo, password }: any) {
    return createUserWithEmailAndPassword(this.auth, correo, password);
  }

  ingresar({ correo, password }: any) {
    return signInWithEmailAndPassword(this.auth, correo, password);
  }

  salir() {
    return signOut(this.auth);
  }

  guardarUsuarioEnFirestore(user: any) { //Para guardar en colección users un documento con el mismo ID del usuario
    const docRef = doc(this.firestore, `users/${user.uid}`)
    return setDoc(docRef, user, { merge: true});
    //const userRef = collection(this.firestore, `users`); //Esto agrega a colección sin ID específica
    //return addDoc(userRef, usuario);
  }

  guardarInicioDeSesion(usuario:any){
    let ingreso:object = {mail:usuario.mail, uid:usuario.uid, rol:usuario.rol, ingreso:new Date().toLocaleString()};
    const userRef = collection(this.firestore, `ingresos`); //Esto agrega a colección sin ID específica
    return addDoc(userRef, ingreso);
  }

  traerUsuarioDeFirestore(user:any){
    const docRef = doc(this.firestore, `users/${user.uid}`);
    return getDoc(docRef);
  }

  saveToLocalstorage(user:any){
    localStorage.setItem('usuarioActual', JSON.stringify(user));
  }

  deleteFromLocalstorage(){
    localStorage.removeItem('usuarioActual');
  }

  hayUsuarioLogueado():Observable<boolean>{
    return new Observable((observer) =>{
        observer.next(this.usuarioLogueado);
      });

  }

  get usuarioLogueado(){ //Armar observable para que retorne el usuario logueado
    return this.isLogged;
  }


}
