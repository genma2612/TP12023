import { Component } from '@angular/core';
import { UserAuthService } from 'src/app/Servicios/user-auth.service';


@Component({
  selector: 'app-respuestas',
  templateUrl: './respuestas.component.html',
  styleUrls: ['./respuestas.component.css']
})
export class RespuestasComponent {

  encuestas:any[] = [];

  constructor(private userAuth:UserAuthService){
    this.userAuth.traerColeccionOrdenada('encuestas', 'fecha').subscribe(
      data => this.encuestas = data
    )
  }

}
