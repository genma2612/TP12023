import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuthService } from 'src/app/Servicios/user-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  hayUsuario:boolean;

  constructor(private userAuth:UserAuthService){
    this.hayUsuario = this.userAuth.usuarioLogueado;
  }

  ngOnInit(): void {
  }

  salir(){
    this.userAuth.salir();
  }

}
