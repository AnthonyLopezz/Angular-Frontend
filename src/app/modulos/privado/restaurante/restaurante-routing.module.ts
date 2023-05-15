import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RestauranteAdminComponent } from './restaurante-admin/restaurante-admin.component';
import { RestauranteCrearComponent } from './restaurante-crear/restaurante-crear.component';
import { RestauranteEditarComponent } from './restaurante-editar/restaurante-editar.component';


const routes: Routes = [
  { path: 'managerestaurant', component: RestauranteAdminComponent },
  { path: 'addrestaurant', component: RestauranteCrearComponent },
  { path: 'editrestaurant', component: RestauranteEditarComponent},

  { path: '**', redirectTo: 'managerole', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class RestauranteRoutingModule { }
