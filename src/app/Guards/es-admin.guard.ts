import { CanActivateFn } from '@angular/router';

export const esAdminGuard: CanActivateFn = (route, state) => {
  console.info(JSON.parse(localStorage.getItem('usuarioActual')!).rol);
  return JSON.parse(localStorage.getItem('usuarioActual')!).rol == 'admin';
};
