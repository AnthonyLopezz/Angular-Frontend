import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, catchError, map } from 'rxjs';
import { Producto } from 'src/app/modelos/producto';
import { ProductoServicioService } from 'src/app/servicios/producto-servicio.service';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/toast.func';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';

@Component({
  selector: 'app-producto-editar',
  templateUrl: './producto-editar.component.html',
  styleUrls: ['./producto-editar.component.css'],
})
export class ProductoEditarComponent implements OnInit {
  public id: string = '';
  public prod: any = Producto;

  public tmp: any;
  public tmpBase64: any;
  public cargaFinalizada: boolean;

  public sub: Subscription;

  public file: File;

  privPhoto: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private prodService: ProductoServicioService,
    public toastr: ToastrService
  ) {
    this.cargaFinalizada = false;
    this.file = this.tmp;
    this.sub = this.tmp;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params['id']);
      this.id = params['id'];
      this.prodService.getOneProd(this.id).subscribe(
        (res) => {
          this.prod = res;
          this.cargaFinalizada = true;
        },
        (error) => console.log(error)
      );
    });

    if (this.sub) this.sub.unsubscribe();
  }

  onPhotoSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      // Image Preview
      const reader = new FileReader();
      reader.onload = (e) => (this.tmpBase64 = reader.result);
      reader.readAsDataURL(this.file);
    }
  }

  showFileName(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.privPhoto = file.name;
    } else {
      this.privPhoto = '';
    }
  }

  deleteProd(id: string) {
    this.prodService.removeProd(id).subscribe(
      (res) => {
        console.log(res);
        mostrarMensaje('info', 'Producto eliminado!', 'Correcto', this.toastr);
        this.router.navigate(['/private/product/manageproduct']); // No funciona !!!
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateProd(form: NgForm): void {
    const name: any = this.prod.nombreProducto;
    const detail: any = this.prod.detalleProducto;
    const value: any = this.prod.valorProducto;
    const privPhoto: any = this.prod.privadoFotoProducto;
    const publPhoto: any = this.prod.publicoFotoProducto;
    const photoBs64: any = this.tmpBase64

    const editObjProd = new Producto(
      this.id,
      name,
      detail,
      value,
      privPhoto,
      publPhoto,
      photoBs64
    );
    console.log(editObjProd);
    this.sub = this.prodService
      .updateProd(this.id, editObjProd)
      .pipe(
        map((response) => {
          console.log(editObjProd);

          mostrarMensaje(
            'success',
            'Producto actualizado!',
            'Correcto',
            this.toastr
          );
          form.reset();
          return response;
        }),
        catchError((err) => {
          mostrarMensaje(
            'error',
            'Producto no actualizado',
            'Error',
            this.toastr
          );
          form.reset();
          throw err;
        })
      )
      .subscribe(observadorAny);

    this.sub = this.prodService
      .updatePhotoProd(this.id, editObjProd)
      .pipe(
        map((response) => {
          mostrarMensaje(
            'success',
            'Foto Producto actualizado!',
            'Correcto',
            this.toastr
          );
          form.reset();
          return response;
        }),
        catchError((err) => {
          mostrarMensaje(
            'error',
            'Foto Producto no actualizada',
            'Error',
            this.toastr
          );
          form.reset();
          throw err;
        })
      )
      .subscribe(observadorAny);
  }
}
