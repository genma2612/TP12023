import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegopropioComponent } from './juegopropio.component';

const routes: Routes = [{ path: '', component: JuegopropioComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegopropioRoutingModule { }
