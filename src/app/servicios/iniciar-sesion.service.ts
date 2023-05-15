import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import * as miUrl from '../utilidades/dominios/uris';
import { InicioSesion } from '../modelos/inicio-sesion';
import { RespuestaInicioSesion } from '../modelos/respuesta-inicio-sesion';
import { RegistrarUsuario } from '../modelos/registrar-usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class IniciarSesionService {
  public apiInicioSesion: string = miUrl.API_INICIO_SESION + '/singin';
  public apiRegistrarUsuario: string = miUrl.API_REGISTRAR_USUARIO + '/user';

  constructor(private http: HttpClient, private router: Router) {}

  public iniciarSesion( objAcceso: InicioSesion ): Observable<RespuestaInicioSesion> {
    return this.http.post<RespuestaInicioSesion>( this.apiInicioSesion, objAcceso );
  }

  public registarUsuario( objAcceso: RegistrarUsuario ): Observable<RespuestaInicioSesion> {
    return this.http.post<RespuestaInicioSesion>( this.apiRegistrarUsuario, objAcceso );
  }

  public salir(): void {
    localStorage.removeItem('foto_usta');
    localStorage.removeItem('token_usta');
    this.router.navigate(['land/home']);
  }
}
