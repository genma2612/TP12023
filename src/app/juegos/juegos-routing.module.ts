import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegosComponent } from './juegos.component';
import { AhorcadoComponent } from './Componentes/ahorcado/ahorcado.component';
import { ChatComponent } from './Componentes/chat/chat.component';
import { MayoromenorComponent } from './Componentes/mayoromenor/mayoromenor.component';
import { PreguntadosComponent } from './Componentes/preguntados/preguntados.component';

const routes: Routes = [
  { path: '', component: JuegosComponent,
    children: [
      { path: 'ahorcado', component: AhorcadoComponent},
      { path: 'chat', component: ChatComponent},
      { path: 'mayoromenor', component: MayoromenorComponent},
      { path: 'preguntados', component: PreguntadosComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
