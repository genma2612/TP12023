import { JuegosModule } from './juegos/juegos.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './Pages/registro/registro.component';
import { LoginComponent } from './Pages/login/login.component';
import { BienvenidoComponent } from './Pages/bienvenido/bienvenido.component';
import { HomeComponent } from './Pages/home/home.component';
import { ErrorComponent } from './Pages/error/error.component';
import { AboutComponent } from './Pages/about/about.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, //canActivate, sino a Bienvenido
  { path: "registro", component: RegistroComponent },
  { path: "login", component: LoginComponent },
  { path: "about", component: AboutComponent },
  { path: "bienvenido", component: BienvenidoComponent },
  { path: "home", loadChildren: () => import('./juegos/juegos.module').then(m => m.JuegosModule) /*, canActivate:[GuardianGuard]*/ },
  { path: "**", component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
