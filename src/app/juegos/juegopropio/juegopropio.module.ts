import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegopropioRoutingModule } from './juegopropio-routing.module';
import { JuegopropioComponent } from './juegopropio.component';


@NgModule({
  declarations: [
    JuegopropioComponent
  ],
  imports: [
    CommonModule,
    JuegopropioRoutingModule
  ]
})
export class JuegopropioModule { }
