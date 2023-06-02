import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserAuthService } from 'src/app/Servicios/user-auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  formulario: FormGroup;

  constructor(private authService:UserAuthService) {
    this.formulario = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }


  registrar(){
    this.authService.registrar(this.formulario.value)
    .then(response => alert(response))
    .catch(error => alert(error));
  }

}
