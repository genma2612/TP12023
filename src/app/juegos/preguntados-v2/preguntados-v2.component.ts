import { Component } from '@angular/core';
import { first } from 'rxjs';
import { PreguntasAPIService } from 'src/app/Servicios/preguntas-api.service';
import { UserAuthService } from 'src/app/Servicios/user-auth.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';


@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados-v2.component.html',
  styleUrls: ['./preguntados-v2.component.css']
})
export class PreguntadosV2Component {

  preguntas: any[];
  preguntaActual: any;
  puntaje: number;
  preguntasFlag = false;
  revelar = false;
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

  constructor(private preguntasService: PreguntasAPIService,
    private userAuth:UserAuthService) {
    this.puntaje = 0;
    this.preguntasService.generarPreguntas();
    this.preguntas = [];
  }

  empezar() {
    this.preguntas = this.preguntasService.getPreguntasPaises();
    this.preguntaActual = this.preguntas.shift();
    this.revelar = false;
    this.puntaje = 0;
  }

  seleccionarRespuesta(respuesta: any) {
    let mensaje = 'Incorrecta!';
    let icono: SweetAlertIcon = 'error';
    this.verRespuestas();
    if (respuesta.correcta) {
      this.puntaje++;
      mensaje = 'Correcta!';
      icono = 'success';
    }
    Swal.fire(
      'Tu respuesta es...',
      mensaje,
      icono
    ).then(()=>{
      if (this.preguntas.length > 0) {
        this.preguntaActual = this.preguntas.shift();
        this.verRespuestas();
      }
      else{
        this.gameOver();
      }
    });
  }

  gameOver(){
    Swal.fire(
      'Termino el juego!',
      'Su puntaje es de ' + this.puntaje,
      'success'
    )
    this.guardarResultado();
    this.preguntaActual = null;
    this.preguntasService.generarPreguntas()
  }

  guardarResultado() {
    let resultado = { juego: 'Preguntados', puntaje: this.puntaje };
    this.userAuth.guardarResultado(resultado).then(
      response => console.info(response)
    )
      .catch(
        (error) => console.info(error)
      )
  }

  verRespuestas(){
    this.revelar = !this.revelar;
  }

}
