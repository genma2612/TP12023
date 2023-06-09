import { UserAuthService } from 'src/app/Servicios/user-auth.service';
import { Component, OnInit } from '@angular/core';
import arrayPalabras from './palabras.json';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent {

  imagenes: string[] = ['../../../assets/0.jpg',
    '../../../assets/1.jpg',
    '../../../assets/2.jpg',
    '../../../assets/3.jpg',
    '../../../assets/4.jpg',
    '../../../assets/5.jpg',
    '../../../assets/6.jpg'];
  palabras = arrayPalabras;
  palabraSecreta;
  palabraSecretaArray: string[];
  palabraSecretaArraySecreto: string[];
  puntaje: number;
  vidas: number;
  teclado = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
    'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ',
    'Z', 'X', 'C', 'V', 'B', 'N', 'M'];
  letrasUsadas: string[];
  randNumber;
  mostrarTeclado:boolean;

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  constructor(private ruteador: Router, private userAuth:UserAuthService) {
    this.randNumber = Math.floor(Math.random() * (24 - 0 + 1));
    this.puntaje = 60;
    this.vidas = 6;
    this.letrasUsadas = [];
    this.palabraSecreta = this.palabras[this.randNumber];
    this.palabraSecretaArray = this.palabraSecreta.split('');
    this.palabraSecretaArraySecreto = [];
    for (const iterator of this.palabraSecretaArray) {
      this.palabraSecretaArraySecreto.push('_');
    }
    this.mostrarTeclado = true;
  }

  reiniciar(): void {
    this.randNumber = Math.floor(Math.random() * (24 - 0 + 1));
    this.puntaje = 60;
    this.vidas = 6;
    this.letrasUsadas = [];
    this.palabraSecreta = this.palabras[this.randNumber];
    this.palabraSecretaArray = this.palabraSecreta.split('');
    this.palabraSecretaArraySecreto = [];
    for (const iterator of this.palabraSecretaArray) {
      this.palabraSecretaArraySecreto.push('_');
    }
    this.mostrarTeclado = true;
  }

  hacerTrampa(){
    this.Toast.fire({
      icon: 'warning',
      title: 'La palabra es: ' + this.palabraSecreta
    });
  }


  enviarLetra(letra: string) {
    let letraUsada = false;
    for (const iterator of this.letrasUsadas) {
      if (letra == iterator) {
        this.Toast.fire({
          icon: 'error',
          title: 'Ya usaste la letra ' + letra
        });
        letraUsada = true;
      }
    }
    if (!letraUsada) {
      this.letrasUsadas.push(letra);
      let indices = this.contieneLaLetra(letra, this.palabraSecretaArray);
      if (indices == null) {
        this.vidas -= 1;
        this.puntaje = this.vidas * 10;
      }
      else {
        this.revelarLetra(indices, letra);
        if (this.palabraSecreta == this.palabraSecretaArraySecreto.join("")) {
          this.ganaste();
        }
      }
    }
    if (this.vidas == 0) {
      this.gameOver();
    }
  }

  contieneLaLetra(letra: string, arrayDeLetras: string[]) {
    let indices: number[] = [];
    arrayDeLetras.forEach((value, index) => {
      if (value == letra) {
        indices.push(index);
      }
    });
    if (indices.length >= 1) {
      return indices;
    }
    else {
      return null;
    }
  }

  gameOver() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Perdiste! La palabra era: ' + this.palabraSecreta,
    });
    this.guardarResultado();
    this.mostrarTeclado = false;
  }

  revelarLetra(indices: number[], letra: string) {
    indices.forEach((value) => {
      this.palabraSecretaArraySecreto[value] = letra;
    })
  }

  ganaste() {
    Swal.fire({
      icon: 'success',
      title: 'Ganaste!',
      text: 'Encontraste la palabra ' + this.palabraSecreta + 
      '! Tu puntaje es: ' + this.puntaje,
    });
    this.guardarResultado();
    this.mostrarTeclado = false;
  }

  guardarResultado(){
    let resultado = {juego:'Ahorcado', puntaje:this.puntaje};
    this.userAuth.guardarResultado(resultado).then(
      response => console.info(response)
    )
    .catch(
      (error) => console.info(error) 
    )
  }

}
