import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/Servicios/user-auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-mayoromenor',
  templateUrl: './mayoromenor.component.html',
  styleUrls: ['./mayoromenor.component.css']
})



export class MayoromenorComponent {

  puntaje: number;
  ultimaCarta;
  mazoDeCartasSeparado: any = { diamante: [], trebol: [], corazon: [], pica: [] };
  mazoDeCartasMezclado: any[] = [];
  mostrarBotones;

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

  constructor(
    private userAuth:UserAuthService
  ) {
    this.puntaje = 0;
    for (let index = 0; index < 13; index++) {
      this.mazoDeCartasSeparado.trebol.push({ icon: '♣', number: index + 1 })
      this.mazoDeCartasSeparado.diamante.push({ icon: '♦', number: index + 1 })
      this.mazoDeCartasSeparado.corazon.push({ icon: '♥', number: index + 1 })
      this.mazoDeCartasSeparado.pica.push({ icon: '♠', number: index + 1 })
    }
    this.mostrarBotones = true;
    this.mazoDeCartasMezclado = this.mezclarMazo([...this.mazoDeCartasSeparado.pica, ...this.mazoDeCartasSeparado.corazon,
    ...this.mazoDeCartasSeparado.diamante, ...this.mazoDeCartasSeparado.trebol]);
    this.ultimaCarta = this.mazoDeCartasMezclado.shift();
  }

  tomarCarta(apuesta: string) {
    if (this.mazoDeCartasMezclado.length -1 > 0) {
      let cartaActual = this.ultimaCarta;
      this.ultimaCarta = this.mazoDeCartasMezclado.shift();
      if (apuesta == 'mayor' && cartaActual.number < this.ultimaCarta.number) {
        this.puntaje++;
      }
      else if (apuesta == 'menor' && cartaActual.number > this.ultimaCarta.number) {
        this.puntaje++;
      }
      else if (cartaActual.number == this.ultimaCarta.number){
        this.Toast.fire({
          icon: 'warning',
          title: 'Empate no suma puntos :('
        });
      }
      else {
        this.gameOver("Te equivocaste! Tu puntaje quedó en ");
      }
    }
    else{
      this.gameOver("Ya no quedan cartas! Tu puntaje quedó en ");
    }
  }


  mezclarMazo(array: any[]) {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
  }

  colorDeCarta(icono: string) {
    if (icono == '♥' || icono == '♦')
      return 'red';
    else
      return '';
  }

  verSiguienteCarta() {
    this.Toast.fire({
      icon: 'warning',
      title: 'El número de la siguiente carta es: ' + this.mazoDeCartasMezclado[0].number
    });
  }

  gameOver(mensaje:string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: mensaje + this.puntaje,
    });
    this.guardarResultado();
    this.mostrarBotones = false;
  }

  guardarResultado(){
    let resultado = {juego:'Mayor o Menor', puntaje:this.puntaje};
    this.userAuth.guardarResultado(resultado).then(
      response => console.info(response)
    )
    .catch(
      (error) => console.info(error) 
    )
  }

}