import { Component, OnInit, OnDestroy } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserAuthService } from 'src/app/Servicios/user-auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  arrayMensajes: any[] = [];
  mensaje = '';
  intervalo:any;

  constructor(private spinner: NgxSpinnerService, private userAuth: UserAuthService, private router: Router) {
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
  ngOnDestroy(): void {
    clearInterval(this.intervalo);
  }

  ngOnInit(): void {
    this.spinner.show();
    this.intervalo = setInterval(() => {
      this.router.navigateByUrl('home/chat', { skipLocationChange: true }).then(() => {
        this.router.navigate(['home/chat']);
      });
    }, 1000);
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
