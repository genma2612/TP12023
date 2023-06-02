import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserAuthService } from 'src/app/Servicios/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formulario: FormGroup;

  constructor(private userAuth:UserAuthService) {
    this.formulario = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }


  loguear(){
    this.userAuth.ingresar(this.formulario.value)
    .then(response => console.log(response.user.email))
    .catch(error => console.info(error));
  }

}
