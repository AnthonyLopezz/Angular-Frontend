import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import * as miUrl from '../utilidades/dominios/uris';
import { InicioSesion } from '../modelos/inicio-sesion';
import { RespuestaInicioSesion } from '../modelos/respuesta-inicio-sesion';
import { RegistrarUsuario } from '../modelos/registrar-usuario';
import { Router } from '@angular/router';

// JWT token
import jwtDecode from 'jwt-decode';
import { MiSession } from '../modelos/mi-session';

@Injectable({
  providedIn: 'root',
})
export class IniciarSesionService {
  public apiInicioSesion: string = miUrl.API_INICIO_SESION + '/singin';
  public apiRegistrarUsuario: string = miUrl.API_REGISTRAR_USUARIO + '/user';
  public objMiSesion: MiSession;
  public fotoMiniatura: string;

  constructor(private http: HttpClient, private router: Router) {
    this.objMiSesion = this.iniciarlizarMiSesion();
    this.fotoMiniatura = '';
  }

  // Methods

  private iniciarlizarMiSesion(): MiSession {
    return new MiSession('', '', '', '', '', '');
  }

  // Services

  public iniciarSesion(
    objAcceso: InicioSesion
  ): Observable<RespuestaInicioSesion> {
    return this.http.post<RespuestaInicioSesion>(
      this.apiInicioSesion,
      objAcceso
    );
  }

  public registarUsuario(
    objAcceso: RegistrarUsuario
  ): Observable<RespuestaInicioSesion> {
    return this.http.post<RespuestaInicioSesion>(
      this.apiRegistrarUsuario,
      objAcceso
    );
  }

  public salir(): void {
    localStorage.removeItem('foto_usta');
    localStorage.removeItem('token_usta');
    this.router.navigate(['land/home']);
  }

  // Business logical

  public obtenerDatosSesion(): MiSession {
    return this.objMiSesion;
  }

  public verificarUser(): boolean {
    if (localStorage.getItem('token_usta')) {
      try {
        const token: any = localStorage.getItem('token_usta');
        const objTmp: any = jwtDecode(token);
        
        this.objMiSesion.codSesion = objTmp.id;
        this.objMiSesion.correoMiSesion = objTmp.correoAcceso;
        this.objMiSesion.rolMiSesion = objTmp.nombreRol;
        this.objMiSesion.ciudadMiSesion = objTmp.nombreCiudad;
        this.objMiSesion.nombresMiSesion = objTmp.nombresUsuario;
        this.objMiSesion.apellidosMiSesion = objTmp.apellidosUsuario;

        this.fotoMiniatura = String(localStorage.getItem('foto_usta'));

        return true;
      } catch (error) {
        console.log(error);
      }
    }
    return false;
  }
}
