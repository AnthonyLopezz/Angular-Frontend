import { Component } from '@angular/core';
import { MiSession } from 'src/app/modelos/mi-session';
import { IniciarSesionService } from 'src/app/servicios/iniciar-sesion.service';

@Component({
  selector: 'app-cabecera-dash',
  templateUrl: './cabecera-dash.component.html',
  styleUrls: ['./cabecera-dash.component.css'],
})
export class CabeceraDashComponent {
  public objMiSesion : MiSession;

  constructor(public sessionService: IniciarSesionService) {
    this.objMiSesion = sessionService.obtenerDatosSesion();
  }
}
