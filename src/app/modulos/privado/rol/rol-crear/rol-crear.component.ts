import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription, catchError, map } from 'rxjs';
import { Rol } from 'src/app/modelos/rol';
import { RoleService } from 'src/app/servicios/role.service';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/toast.func';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';

@Component({
  selector: 'app-rol-crear',
  templateUrl: './rol-crear.component.html',
  styleUrls: ['./rol-crear.component.css'],
})
export class RolCrearComponent implements OnInit, OnDestroy {
  private tmp: any;
  public objRole: Rol;
  public miSuscripcion: Subscription;

  // public token = localStorage.getItem('token_usta');

  constructor(
    public router: Router,
    public service: RoleService,
    public toastr: ToastrService
  ) {
    this.objRole = new Rol('', 0);
    this.miSuscripcion = this.tmp;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.miSuscripcion) this.miSuscripcion.unsubscribe();
  }

  public operaciones(formulario: NgForm): void {
    const name: any = this.objRole.nombreRol;
    const status: any = this.objRole.estadoRol;

    const objNuevoRole = new Rol(name, status);
    console.log(objNuevoRole);
    this.miSuscripcion = this.service
      .crear(objNuevoRole)
      .pipe(
        map((resultado) => {
          console.log(objNuevoRole);

          mostrarMensaje('success', 'Role creado!', 'Correcto', this.toastr);
          //formulario.reset();
          return resultado;
        }),
        catchError((err) => {
          mostrarMensaje('error', 'Role no creado', 'Error', this.toastr);
          formulario.reset();
          throw err;
        })
      )
      .subscribe(observadorAny);
  }
}
