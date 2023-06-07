import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/Servicios/user-auth.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formulario: FormGroup;

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  constructor(private authService: UserAuthService,
    private router: Router,
    private spinner: NgxSpinnerService) {
    this.formulario = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }


  loguear() {
    this.spinner.show();
    this.authService.ingresar(this.formulario.value)
      .then(response => {
        this.authService.traerUsuarioDeFirestore(response.user).then(
          snapshot => {
            this.authService.saveToLocalstorage(snapshot.data())
            this.authService.guardarInicioDeSesion(snapshot.data())
          }
        );
        this.Toast.fire({
          icon: 'success',
          title: 'Logueado correctamente!'
        })
        this.spinner.hide();
        this.router.navigate(['home']);
      })
      .catch(error => {
        this.spinner.hide()
        this.Toast.fire({
          icon: 'error',
          title: error.message
        })
      });
  }

}
