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
    this.userAuth.traerColeccionOrdenada('resultados', 'fecha').subscribe(
      data => this.resultados = data
    )
  }
  ngOnDestroy(): void {
  }

}
