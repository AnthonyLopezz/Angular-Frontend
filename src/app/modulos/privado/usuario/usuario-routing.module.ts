import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioAdminComponent } from './usuario-admin/usuario-admin.component';
import { UsuarioCrearComponent } from './usuario-crear/usuario-crear.component';

const routes: Routes = [
  { path: 'manageuser', component: UsuarioAdminComponent },
  { path: 'adduser', component: UsuarioCrearComponent },
  { path: 'edituser', component: UsuarioCrearComponent },

  { path: '**', redirectTo: 'managerole', pathMatch: 'full' },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UsuarioRoutingModule { }
