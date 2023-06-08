import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MayoromenorRoutingModule } from './mayoromenor-routing.module';
import { MayoromenorComponent } from './mayoromenor.component';
import { CambiarPorSignoCharPipe } from 'src/app/Pipes/colorear-char.pipe';


@NgModule({
  declarations: [
    MayoromenorComponent,
    CambiarPorSignoCharPipe
  ],
  imports: [
    CommonModule,
    MayoromenorRoutingModule
  ]
})
export class MayoromenorModule { }
