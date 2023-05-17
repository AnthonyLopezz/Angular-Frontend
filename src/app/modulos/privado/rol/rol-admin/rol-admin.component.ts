import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, finalize, map } from 'rxjs';
import { Rol } from 'src/app/modelos/rol';
import { RoleService } from 'src/app/servicios/role.service';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';

@Component({
  selector: 'app-rol-admin',
  templateUrl: './rol-admin.component.html',
  styleUrls: ['./rol-admin.component.css'],
})
export class RolAdminComponent implements OnInit, OnDestroy {
  public tmp: any;
  public cargaFinalizada: boolean;
  public arrRole: Rol[];
  public subscription: Subscription;

  constructor(private service: RoleService) {
    this.arrRole = [];
    this.subscription = this.tmp;
    this.cargaFinalizada = false;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    
  }
  ngOnInit(): void {
    this.obtenerRoles();
  }

  public obtenerRoles(): void {
    this.subscription = this.service
      .obtener()
      .pipe(
        map((respuesta) => {
          console.log(respuesta);
          this.arrRole = respuesta;
        }),
        finalize(() => {
          this.cargaFinalizada = true;
        })
      )
      .subscribe(observadorAny);
  }
}
