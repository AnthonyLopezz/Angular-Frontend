import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolRoutingModule } from './rol-routing.module';
import { RolCrearComponent } from './rol-crear/rol-crear.component';
import { RolEditarComponent } from './rol-editar/rol-editar.component';
import { RolAdminComponent } from './rol-admin/rol-admin.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RoleService } from 'src/app/servicios/role.service';

@NgModule({
  declarations: [RolCrearComponent, RolEditarComponent, RolAdminComponent],
  imports: [CommonModule, RolRoutingModule, NgxPaginationModule, FormsModule],
})
export class RolModule {}
