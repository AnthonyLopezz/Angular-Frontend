import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoRoutingModule } from './producto-routing.module';
import { ProductoCrearComponent } from './producto-crear/producto-crear.component';
import { ProductoEditarComponent } from './producto-editar/producto-editar.component';
import { ProductoAdminComponent } from './producto-admin/producto-admin.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ProductoCrearComponent,
    ProductoEditarComponent,
    ProductoAdminComponent,
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    NgxPaginationModule,
    FormsModule,
    RouterModule
  ],
})
export class ProductoModule {}
