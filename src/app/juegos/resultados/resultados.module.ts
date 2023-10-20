import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultadosRoutingModule } from './resultados-routing.module';
import { ResultadosComponent } from './resultados.component';

import { DataTablesModule } from "angular-datatables";


@NgModule({
  declarations: [
    ResultadosComponent
  ],
  imports: [
    CommonModule,
    ResultadosRoutingModule,
    DataTablesModule
  ]
})
export class ResultadosModule { }
