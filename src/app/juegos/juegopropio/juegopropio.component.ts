import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserAuthService } from 'src/app/Servicios/user-auth.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-juegopropio',
  templateUrl: './juegopropio.component.html',
  styleUrls: ['./juegopropio.component.css']
})
export class JuegopropioComponent {
  @ViewChild('octavio') octavio!: ElementRef;
  @ViewChild('cactus') cactus!: ElementRef;

  puntaje = 0;
  sumandoPuntos=false;
  jugando!:any;
  puntajeEnCurso!:any;


  constructor(private userAuth:UserAuthService){
  }

  saltar() {
    if (this.octavio.nativeElement.classList[1] != 'saltar') {
      this.octavio.nativeElement.classList.add('saltar');
      setTimeout(() => {
        this.octavio.nativeElement.classList.remove('saltar');
      }, 300);
    }
  }

  empezar(){
    this.cactus.nativeElement.classList.add('mover');
    this.puntaje = 0;
    this.sumandoPuntos = true;
    this.jugando = setInterval(()=>{
      let octavioY = parseInt(window.getComputedStyle(this.octavio.nativeElement)
      .getPropertyValue('top'));
      let cactusX = parseInt(window.getComputedStyle(this.cactus.nativeElement)
      .getPropertyValue('left'));
      if(cactusX < 40 && cactusX > 0 && octavioY >= 140){
        this.gameOver();
      }
    },10);
    this.puntajeEnCurso = setInterval(()=> {
      this.puntaje++
    },1000);
  }

  gameOver(){
    this.sumandoPuntos = false;
    clearInterval(this.puntajeEnCurso)
    clearInterval(this.jugando);
    this.cactus.nativeElement.classList.remove('mover');
    Swal.fire(
      'PROFE PROFE PROFE!',
      'Te agarraron! Hiciste ' + this.puntaje + ' puntos.',
      'error'
    ).then(()=>{
      this.guardarResultado();
    })
    .catch(error => console.info(error));
  }

  guardarResultado() {
    let resultado = { juego: 'Juego Propio', puntaje: this.puntaje };
    this.userAuth.guardarResultado(resultado).then(
      response => console.info(response)
    )
      .catch(
        (error) => console.info(error)
      )
  }



}
