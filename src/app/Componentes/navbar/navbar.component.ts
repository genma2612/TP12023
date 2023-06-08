import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/Clases/usuario';
import { UserAuthService } from 'src/app/Servicios/user-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userAuth:UserAuthService, private ruteador:Router){
  }

  ngOnInit(): void {
  }

  salir(){
    this.userAuth.salir().then(()=>
      this.ruteador.navigate(['/bienvenido'])
    );
  }

  get hayUsuario(){
    return this.userAuth.hayUsuarioLogueado;
  }

  get datosUsuario(){
    return this.userAuth.usuarioLogueado;
  }


}
