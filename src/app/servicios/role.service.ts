import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import * as miUrl from '../utilidades/dominios/uris';
import { Rol } from '../modelos/rol';
import { ResponseI } from '../modelos/responseI';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  
  public apiGetRole: string = miUrl.API_ROLE;
  public apiAddRole: string = miUrl.API_ROLE + '/add';

  constructor(private http: HttpClient) {}

  public obtener(): Observable<Rol[]> {
    const bearer = 'Bearer ' + String(localStorage.getItem('token_usta'));
    const datos = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        authorization: bearer,
      },
    };
    return this.http.get<Rol[]>(this.apiGetRole + '/all', datos);
  }

  public crear(objRol: Rol): Observable<Rol> {
    const bearer = 'Bearer ' + String(localStorage.getItem('token_usta'));
    const datos = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        authorization: bearer,
      },
    };
    return this.http.post<Rol>(this.apiAddRole, objRol, datos);
  }
}
