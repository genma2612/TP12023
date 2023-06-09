import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserAuthService } from 'src/app/Servicios/user-auth.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent {

  public formulario: FormGroup;

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

  constructor(private fb: FormBuilder, private userAuth: UserAuthService, private ruteador:Router) {
    this.formulario = this.fb.group({
      'nombre': ['Juan', [Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')]],
      'apellido': ['Perez', [Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')]],
      'edad': [18, [Validators.required, Validators.min(18), Validators.max(99)]],
      'telefono': [42209988, [Validators.required, Validators.min(10000000), Validators.max(9999999999)]],
      'recomienda': [false],
      'puntaje': ['★★★★★', Validators.required],
      'comentario': ['Esta es una reseña...', Validators.required]
    });
  }


  guardar() {
    let encuesta = this.formulario.value;
    this.userAuth.guardarEncuesta(encuesta).then(()=>
    Swal.fire(
      'Encuesta enviada',
      'Gracias por tu opinión!',
      'success'
      ).then(() =>
        this.ruteador.navigate(['/home/ahorcado'])
      )
    )
    .catch (
      (error) => console.info(error) 
    )
  }

}
