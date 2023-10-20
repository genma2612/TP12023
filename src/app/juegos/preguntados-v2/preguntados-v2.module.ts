import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreguntadosV2RoutingModule } from './preguntados-v2-routing.module';
import { PreguntadosV2Component } from './preguntados-v2.component';


@NgModule({
  declarations: [
    PreguntadosV2Component
  ],
  imports: [
    CommonModule,
    PreguntadosV2RoutingModule
  ]
})
export class PreguntadosV2Module { }
