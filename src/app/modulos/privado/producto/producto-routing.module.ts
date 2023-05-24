import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductoAdminComponent } from './producto-admin/producto-admin.component';
import { ProductoCrearComponent } from './producto-crear/producto-crear.component';
import { ProductoEditarComponent } from './producto-editar/producto-editar.component';

const routes: Routes = [
  { path: 'manageproduct', component: ProductoAdminComponent },
  { path: 'addproduct', component: ProductoCrearComponent },
  { path: 'editproduct/:id', component: ProductoEditarComponent },

  { path: '**', redirectTo: 'manageproduct', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ProductoRoutingModule {}
