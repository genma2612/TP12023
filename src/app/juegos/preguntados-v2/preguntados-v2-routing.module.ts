import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreguntadosV2Component } from './preguntados-v2.component';

const routes: Routes = [{ path: '', component: PreguntadosV2Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreguntadosV2RoutingModule { }
