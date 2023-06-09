import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const noEstaLogueadoGuard: CanActivateFn = (route, state) => {
  //const userAuth:UserAuthService = inject(UserAuthService);
  //console.info(userAuth.hayUsuarioLogueado);
  //return userAuth.hayUsuarioLogueado;
  if(localStorage.getItem('usuarioActual') != null){
    inject(Router).navigate(['/home/ahorcado']);
  }
  return true;
};
