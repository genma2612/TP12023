import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EncuestaRoutingModule } from './encuesta-routing.module';
import { EncuestaComponent } from './encuesta.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EncuestaComponent
  ],
  imports: [
    CommonModule,
    EncuestaRoutingModule,
    ReactiveFormsModule
  ]
})
export class EncuestaModule { }
