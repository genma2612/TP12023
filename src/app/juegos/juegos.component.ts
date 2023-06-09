import { Component, OnInit } from '@angular/core';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css']
})
export class JuegosComponent implements OnInit {

  constructor(private spinner:NgxSpinnerService, private ruteador:Router){
    
  }

  ngOnInit(): void { //Esto se encarga de detectar si está cargando un modulo children
    this.ruteador.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart) {
          this.spinner.show();
          console.info('Está cargando un modulo');
      } else if (event instanceof RouteConfigLoadEnd) {
          console.info('Terminó la carga del modulo');
          this.spinner.hide();
      }
  });
  }

}
