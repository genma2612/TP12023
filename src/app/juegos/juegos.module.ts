import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../Componentes/sidebar/sidebar.component';
import { JuegosRoutingModule } from './juegos-routing.module';
import { JuegosComponent } from './juegos.component';
import { AhorcadoComponent } from './Componentes/ahorcado/ahorcado.component';
import { MayoromenorComponent } from './Componentes/mayoromenor/mayoromenor.component';
import { ChatComponent } from './Componentes/chat/chat.component';
import { PreguntadosComponent } from './Componentes/preguntados/preguntados.component';


@NgModule({
  declarations: [
    JuegosComponent,
    SidebarComponent,
    AhorcadoComponent,
    MayoromenorComponent,
    ChatComponent,
    PreguntadosComponent
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule
  ]
})
export class JuegosModule { }
