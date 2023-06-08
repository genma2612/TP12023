import { Component, OnDestroy } from '@angular/core';
import { UserAuthService } from 'src/app/Servicios/user-auth.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnDestroy {

  resultados:any[] = [];

  constructor(private userAuth:UserAuthService){
    /* Como promesa
    this.userAuth.traerColeccion('resultados').then(
      response => response.forEach(
        (doc) => console.info('documento: ', doc.data())
      )
      ).catch(
        error => console.info(error)
      )
    */
   // Como Observable
    this.listadoResultados();
  }
  ngOnDestroy(): void {
    this.listadoResultados().unsubscribe();
  }

  listadoResultados(){
    return this.userAuth.traerColeccion('resultados').subscribe(
      data => data.forEach(
        (doc) => {
          console.info(doc.data());
          this.resultados.push(doc.data());
        })
    );
  }

}
