import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegosComponent } from './juegos.component';
import { esAdminGuard } from '../Guards/es-admin.guard';

const routes: Routes = [
  { path: '', component: JuegosComponent,
    children: [
      { path: 'ahorcado', loadChildren: () => import('./ahorcado/ahorcado.module').then(m => m.AhorcadoModule) },
      { path: 'chat', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule) },
      { path: 'mayoromenor', loadChildren: () => import('./mayoromenor/mayoromenor.module').then(m => m.MayoromenorModule) },
      { path: 'preguntados', loadChildren: () => import('./preguntados/preguntados.module').then(m => m.PreguntadosModule) },
      { path: 'preguntadosV2', loadChildren: () => import('./preguntados-v2/preguntados-v2.module').then(m => m.PreguntadosV2Module) },
      { path: 'juegopropio', loadChildren: () => import('./juegopropio/juegopropio.module').then(m => m.JuegopropioModule) },
      { path: 'resultados', loadChildren: () => import('./resultados/resultados.module').then(m => m.ResultadosModule) },
      { path: 'encuesta', loadChildren: () => import('./encuesta/encuesta.module').then(m => m.EncuestaModule) },
      { path: 'respuestas', loadChildren: () => import('./respuestas/respuestas.module').then(m => m.RespuestasModule), canActivate:[esAdminGuard]  }
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
