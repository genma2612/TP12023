import { Component } from '@angular/core';
import { UserAuthService } from 'src/app/Servicios/user-auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private userAuth:UserAuthService){}

  get isAdmin(){
    if(this.userAuth.usuarioLogueado != undefined)
      return this.userAuth.usuarioLogueado.rol == 'admin';
    else 
      return false;
  }
}
