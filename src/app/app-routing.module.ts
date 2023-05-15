import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorComponent } from './modulos/publico/error/error.component';
import { ContenedorLandComponent } from './modulos/contenedor/land/contenedor-land/contenedor-land.component';
import { ContenedorDashComponent } from './modulos/contenedor/dash/contenedor-dash/contenedor-dash.component';
import { RUTAS_LANDSCAPE } from './utilidades/rutas/land-rutas';
import { RUTAS_DASHBOARD } from './utilidades/rutas/dash-rutas';

const routes: Routes = [
  { path: '', component: ContenedorLandComponent, children: RUTAS_LANDSCAPE },
  { path: 'private', component: ContenedorDashComponent, children: RUTAS_DASHBOARD },

  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
