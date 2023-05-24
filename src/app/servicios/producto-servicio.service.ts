import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as url from '../utilidades/dominios/uris';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Producto } from '../modelos/producto';

@Injectable({
  providedIn: 'root',
})
export class ProductoServicioService {
  public apiGetProd: string = url.API_PRODUCTO + '/all';
  public apiGetOneProd: string = url.API_PRODUCTO + '/one';
  public apiPaginateProd: string = url.API_PRODUCTO + 'paginate';
  public apiAddProd: string = url.API_PRODUCTO + '/add';
  public apiUpdateInfoProd: string = url.API_PRODUCTO + '/updateinfo';
  public apiUpdatePhotoProd: string = url.API_PRODUCTO + '/updatephoto';
  public apiDeleteProd: string = url.API_PRODUCTO + '/delete';

  constructor(private http: HttpClient) {}

  public getProds(page: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiGetProd + '?page' + page);
  }

  public getOneProd(id: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiGetOneProd}/${id}`);
  }

  public addProd(obj: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiAddProd, obj);
  }

  public updateProd(id: string, obj: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUpdateInfoProd}/${id}`, obj).pipe(
      map((response: any) => response.json),
      catchError((error) => {
        console.error(error.error.mensaje);
        return throwError(error);
      })
    );
  }

  public updatePhotoProd(id: string, obj: Producto): Observable<Producto> {
    return this.http
      .put<Producto>(`${this.apiUpdatePhotoProd}/${id}`, obj)
      .pipe(
        map((response: any) => response.json),
        catchError((error) => {
          console.error(error.error.mensaje);
          return throwError(error);
        })
      );
  }

  public removeProd(codigo: string) {
    return this.http.delete(`${this.apiDeleteProd}/${codigo}`);
  }
}
