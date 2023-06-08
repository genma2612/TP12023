import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Clases/usuario';
import { UserAuthService } from 'src/app/Servicios/user-auth.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  formulario: FormGroup;

  firebaseErrors:any = {
    'auth/email-already-in-use': 'El correo ingresado ya se encuentra registrado',
    'auth/invalid-email': 'El correo ingresado no tiene el formato correcto'
  };

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

  constructor(
    private authService: UserAuthService,
    private router: Router,
    private spinner: NgxSpinnerService) {
    this.formulario = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }


  registrar() {
    this.spinner.show();
    this.authService.registrar(this.formulario.value)
      .then(
        response => {
          let usuario: Usuario = { mail: response.user.email, uid: response.user.uid, rol: 'usuario' };
          this.authService.guardarUsuarioEnFirestore(usuario)
            .then(() => {
              this.authService.saveToLocalstorage(usuario);
              this.authService.ingresar(this.formulario.value)
                .then(() => {
                  this.Toast.fire({
                    icon: 'success',
                    title: 'Cuenta creada exitosamente. Ingresando...'
                  })
                  this.spinner.hide();
                  this.router.navigate(['home'])
                });
            }
            );
        })
      .catch(error => {
        this.spinner.hide()
        this.Toast.fire({
          icon: 'error',
          title: this.firebaseErrors[error.code] || error.code
        })
        console.info(error)
      });
  }

}
