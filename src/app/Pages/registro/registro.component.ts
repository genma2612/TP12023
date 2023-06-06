import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/Servicios/user-auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

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

  constructor(
    private authService: UserAuthService,
    private router: Router) {
    this.formulario = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }


  registrar() {
    this.authService.registrar(this.formulario.value)
      .then(
        response => {
          this.authService.guardarDocumentoEnFirestore(response.user)
            .then(() => {
              this.Toast.fire({
                icon: 'success',
                title: 'Cuenta creada exitosamente. Ingresando...'
              })
              this.authService.ingresar(this.formulario.value)
              .then(() => this.router.navigate(['home']));
            }
            );
        })
      .catch(error => alert(error));
  }

}
