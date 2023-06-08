import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegosComponent } from './juegos.component';

const routes: Routes = [
  { path: '', component: JuegosComponent,
    children: [
      { path: 'ahorcado', loadChildren: () => import('./ahorcado/ahorcado.module').then(m => m.AhorcadoModule) },
      { path: 'chat', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule) },
      { path: 'mayoromenor', loadChildren: () => import('./mayoromenor/mayoromenor.module').then(m => m.MayoromenorModule) },
      { path: 'preguntados', loadChildren: () => import('./preguntados/preguntados.module').then(m => m.PreguntadosModule) },
      { path: 'juegopropio', loadChildren: () => import('./juegopropio/juegopropio.module').then(m => m.JuegopropioModule) },
      { path: 'resultados', loadChildren: () => import('./resultados/resultados.module').then(m => m.ResultadosModule) }
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
