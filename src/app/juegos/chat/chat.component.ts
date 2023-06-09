import { Component } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserAuthService } from 'src/app/Servicios/user-auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  arrayMensajes: any[] = [];
  mensaje = '';

  constructor(private userAuth: UserAuthService) {
    this.userAuth.traerTodosLosMensajes().subscribe(
      data => this.arrayMensajes = data
    );

    /*
    this.userAuth.traerTodosLosMensajes().then(
      data => data.forEach(
        (doc) => this.arrayMensajes.push(doc.data())
      )
    )
    console.info(this.arrayMensajes);
    */
  }

  esMiMensaje(mensaje: any) {
    if (mensaje.usuario == this.userAuth.usuarioLogueado?.mail)
      return 'green text-end';
    else
      return 'blue'
  }




  enviarMensaje() {
    this.userAuth.guardarMensaje(this.mensaje);
  }

}
