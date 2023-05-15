import { ErrorInternoComponent } from 'src/app/modulos/privado/control/error-interno/error-interno.component';
import { ControlModule } from './../../modulos/privado/control/control.module';
import { Routes } from '@angular/router';

export const RUTAS_DASHBOARD: Routes = [
  {
    path: 'dash',
    loadChildren: () =>
      import('../../modulos/privado/control/control.module').then(
        (m) => m.ControlModule
      ),
  },

  // Ruteo para roles
  {
    path: 'role',
    loadChildren: () =>
      import('../../modulos/privado/rol/rol.module').then((m) => m.RolModule),
  },

  // Ruteo para restaurante
  {
    path: 'restaurant',
    loadChildren: () =>
      import('../../modulos/privado/restaurante/restaurante.module').then((m) => m.RestauranteModule),
  },

  // Ruteo para usuario
  {
    path: 'user',
    loadChildren: () =>
      import('../../modulos/privado/usuario/usuario.module').then((m) => m.UsuarioModule),
  },

  { path: '', redirectTo: 'dash', pathMatch: 'full' },
  { path: '**', component: ErrorInternoComponent },
];
