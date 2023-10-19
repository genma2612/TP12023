import { Component, OnInit } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserAuthService } from 'src/app/Servicios/user-auth.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  arrayMensajes: any[] = [];
  mensaje = '';

  constructor(private spinner: NgxSpinnerService, private userAuth: UserAuthService) {
    this.userAuth.traerTodosLosMensajes().subscribe(
      data => {
        this.arrayMensajes = data
        this.spinner.hide()
      });

    /*
    this.userAuth.traerTodosLosMensajes().then(
      data => data.forEach(
        (doc) => this.arrayMensajes.push(doc.data())
      )
    )
    console.info(this.arrayMensajes);
    */
  }
  ngOnInit(): void {
    this.spinner.show();
  }

  esMiMensaje(mensaje: any) {
    if (mensaje.usuario == this.userAuth.usuarioLogueado?.mail)
      return true;
    else
      return false;
  }




  enviarMensaje() {
    this.userAuth.guardarMensaje(this.mensaje);
    this.mensaje = '';
  }

}
