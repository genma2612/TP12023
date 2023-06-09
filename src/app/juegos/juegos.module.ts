import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../Componentes/sidebar/sidebar.component';
import { JuegosRoutingModule } from './juegos-routing.module';
import { JuegosComponent } from './juegos.component';
import { ScrollToBottomDirective } from './Directivas/scroll-to-bottom.directive';
import { NgxSpinnerModule } from "ngx-spinner";


@NgModule({
  declarations: [
    JuegosComponent,
    SidebarComponent,
    ScrollToBottomDirective
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    NgxSpinnerModule
  ]
})
export class JuegosModule { }
