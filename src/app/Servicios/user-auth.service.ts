import { Usuario } from './../Clases/usuario';
import { 
  DocumentData, 
  Firestore, 
  addDoc, 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private isLogged:boolean = false;
  private objUsuarioLogueado:Usuario|undefined = undefined;

  constructor(private auth: Auth, private firestore: Firestore) { 
    this.auth.onAuthStateChanged(status => {
      if(status != null){
        // Al chequear que el usuario esté, lo trae de Firestore 
        // Registrar lo guarda al momento de autentificar con Google
        // Luego, lo guarda en en localstorage, cambia los atributos
        // Y guarda el usuario para poder acceder a él desde otros componentes
        
        this.traerUsuarioDeFirestore(status).then(
          snapshot => {
            this.objUsuarioLogueado = snapshot.data() as Usuario;
            this.isLogged = true;
            this.saveToLocalstorage(snapshot.data());
            this.guardarInicioDeSesion(snapshot.data());
          }
        );
        
       //
        //this.objUsuarioLogueado = this.getUsuarioLocalstorage();
        //this.isLogged = true;
        //console.info('hayUsuarioLogueado');
        //console.info(this.objUsuarioLogueado);
      }
      else{
        this.isLogged = false;
        console.info('El usuario deslogueó');
        this.objUsuarioLogueado = undefined;
        console.info(this.objUsuarioLogueado);
      }
    })
  }


  registrar({ correo, password }: any) {
    return createUserWithEmailAndPassword(this.auth, correo, password);
  }

  ingresar({ correo, password }: any) {
    return signInWithEmailAndPassword(this.auth, correo, password);
  }

  salir() {
    return signOut(this.auth).then(
      () => this.deleteFromLocalstorage()
    );
  }

  guardarUsuarioEnFirestore(user: any) { //Para guardar en colección users un documento con el mismo ID del usuario
    const docRef = doc(this.firestore, `users/${user.uid}`)
    return setDoc(docRef, user, { merge: true});
  }

  guardarInicioDeSesion(usuario:any){
    let ingreso:object = {mail:usuario.mail, uid:usuario.uid, rol:usuario.rol, ingreso:new Date().toLocaleString()};
    const userRef = collection(this.firestore, `ingresos`); //Esto agrega a colección sin ID específica
    return addDoc(userRef, ingreso);
  }

  guardarResultado(resultado:any){
    let documentoAGuardar = resultado;
    documentoAGuardar.fecha = new Date().toLocaleString();
    documentoAGuardar.usuario = this.objUsuarioLogueado?.mail;
    documentoAGuardar.rol = this.objUsuarioLogueado?.rol;
    const userRef = collection(this.firestore, `resultados`); //Esto agrega a colección sin ID específica
    return addDoc(userRef, documentoAGuardar);
  }

  traerUsuarioDeFirestore(user:any){
    const docRef = doc(this.firestore, `users/${user.uid}`);
    return getDoc(docRef);
  }

  traerColeccion(coleccion:string){
    const colRef = collection(this.firestore,coleccion);
    return from(getDocs(colRef));
    //return getDocs(colRef); //como promesa
  }

  getUsuarioLocalstorage(){
    return JSON.parse(localStorage.getItem('usuarioActual')!);
  }

  saveToLocalstorage(user:any){
    localStorage.setItem('usuarioActual', JSON.stringify(user));
  }

  deleteFromLocalstorage(){
    localStorage.removeItem('usuarioActual');
  }

  get hayUsuarioLogueado(){ //Armar observable para que retorne el usuario logueado?
    return this.isLogged;
  }

  get usuarioLogueado(){
    return this.objUsuarioLogueado;
    //return JSON.parse(localStorage.getItem('usuarioActual')!);
  }


}
