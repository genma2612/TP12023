import { CanActivateFn } from '@angular/router';


export const estaLogueadoGuard: CanActivateFn = (route, state) => {
  //const userAuth:UserAuthService = inject(UserAuthService);
  //console.info(userAuth.hayUsuarioLogueado);
  //return userAuth.hayUsuarioLogueado;
  return localStorage.getItem('usuarioActual') != null;
};
