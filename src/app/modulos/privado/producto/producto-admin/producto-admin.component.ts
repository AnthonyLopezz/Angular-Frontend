import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { Subscription, finalize, map } from 'rxjs';
import { Producto } from 'src/app/modelos/producto';
import { ProductoServicioService } from 'src/app/servicios/producto-servicio.service';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/toast.func';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';

@Component({
  selector: 'app-producto-admin',
  templateUrl: './producto-admin.component.html',
  styleUrls: ['./producto-admin.component.css'],
})
export class ProductoAdminComponent implements OnInit, OnDestroy {
  public tmp: any;
  public cargaFinalizada: boolean;
  public arrayProd: Producto[];
  public sub: Subscription;

  public allProds: number = 0;
  public pagination: number = 1;


  constructor(private prodService: ProductoServicioService, private router: Router,public toastr: ToastrService) {
    this.cargaFinalizada = false;
    this.arrayProd = [];
    this.sub = this.tmp;
  }

  public getProds(): void {
    this.sub = this.prodService
      .getProds(this.pagination)
      .pipe(
        map((response) => {
          console.log(response);
          this.arrayProd = response;
        }),
        finalize(() => {
          this.cargaFinalizada = true;
        })
      )
      .subscribe(observadorAny);
  }

  deleteProd (id: string){
    this.prodService.removeProd(id).subscribe(
      res => {
        console.log(res);
        mostrarMensaje(
          'info',
          'Producto eliminado!',
          'Correcto',
          this.toastr
        );
        this.router.navigate(['/private/product/manageproduct'])
        window.location.reload();

      },
      error => {
        console.log(error);
      }
    )
  }

  renderPage(event: number) {
    this.pagination = event;
    this.getProds();
  }

  editProd(id: string) {
    this.router.navigate(['private/product/editproduct', id])
  }

  
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getProds();
  }
}
