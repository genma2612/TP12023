import { Component } from '@angular/core';
import { first } from 'rxjs';
import { PreguntasAPIService } from 'src/app/Servicios/preguntas-api.service';
import { UserAuthService } from 'src/app/Servicios/user-auth.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';


@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent {

  preguntasRequest: any;
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
    this.generarPreguntas();
    this.preguntas = [];
  }

  empezar() {
    if(this.preguntasFlag){
      this.generarPreguntas();
    }
    this.revelar = false;
    this.puntaje = 0;
    this.preguntasRequest.forEach((element: any) => {
      this.preguntas.push(
        {
          dificultad: element.difficulty,
          categoria: element.category,
          pregunta: element.question.text,
          respuestas: this.mezclarRespuestas([
            { correcta: true, option: element.correctAnswer},
            { correcta: false, option: element.incorrectAnswers[0]},
            { correcta: false, option: element.incorrectAnswers[1]},
            { correcta: false, option: element.incorrectAnswers[2]}
          ])
        }
      )
    });
    this.preguntaActual = this.preguntas.shift();
    console.info(this.preguntaActual);
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

  generarPreguntas(){
    this.preguntasService.getQuestions().pipe(first()).subscribe(
      respose => this.preguntasRequest = respose
    )
    /*
    this.preguntasService.getQuestions().subscribe(
      respose => this.preguntasRequest = respose
    )*/
  }

  mezclarRespuestas(array: any[]) {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
  }

  gameOver(){
    Swal.fire(
      'Termino el juego!',
      'Su puntaje es de ' + this.puntaje,
      'success'
    )
    this.guardarResultado();
    this.preguntaActual = null;
    this.preguntasFlag = true;
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
