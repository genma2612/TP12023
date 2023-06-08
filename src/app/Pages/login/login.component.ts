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

  usuarios = ['usuario1@gmail.com', 'usuario2@gmail.com','admin@gmail.com']
  formulario: FormGroup;

  firebaseErrors:any = {
    'auth/user-not-found': 'El correo ingresado no se encuentra registrado',
    'auth/wrong-password': 'Contraseña incorrecta'
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
        //
        /*
        this.authService.traerUsuarioDeFirestore(response.user).then(
          snapshot => {
            this.authService.saveToLocalstorage(snapshot.data())
            this.authService.guardarInicioDeSesion(snapshot.data())
          }
        );
        */
       //
       this.Toast.fire({
        icon: 'success',
        title: 'Logueado correctamente!'
      })
        setTimeout(()=>{
          console.info('después del timeout...')
          this.router.navigate(['home']);
          this.spinner.hide();
        },3000);
        //this.router.navigate(['home']);
        //this.spinner.hide();
      })
      .catch(error => {
        this.spinner.hide()
        this.Toast.fire({
          icon: 'error',
          title: this.firebaseErrors[error.code] || error.code
        })
      });
  }

  completarCampos(indice:number){
    this.formulario.controls['correo'].setValue(this.usuarios[indice]);
    this.formulario.controls['password'].setValue(111111);
  }

}
