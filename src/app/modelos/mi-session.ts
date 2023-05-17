export class MiSession {
  public codSesion: string;
  public correoMiSesion: string;
  public rolMiSesion: string;
  public ciudadMiSesion: string;
  public nombresMiSesion: string;
  public apellidosMiSesion: string;

  constructor(
    cod: string,
    cor: string,
    rol: string,
    ciu: string,
    nom: string,
    apel: string
  ) {
    this.codSesion = cod;
    this.correoMiSesion = cor;
    this.rolMiSesion = rol;
    this.ciudadMiSesion = ciu;
    this.nombresMiSesion = nom;
    this.apellidosMiSesion = apel;
  }
}
