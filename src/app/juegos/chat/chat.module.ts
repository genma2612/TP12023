import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { FormsModule } from '@angular/forms';
import { CortarUsuarioPipe } from 'src/app/Pipes/cortar-usuario.pipe';
import { TiempoDesdeAhoraPipe } from 'src/app/Pipes/tiempo-desde-ahora.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    ChatComponent,
    CortarUsuarioPipe,
    TiempoDesdeAhoraPipe
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule,
    NgxSpinnerModule
  ]
})
export class ChatModule { }
