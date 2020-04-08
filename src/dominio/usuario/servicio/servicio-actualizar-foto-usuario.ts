import { RepositorioUsuario } from '../puerto/repositorio/repositorio-usuario';
import { Injectable } from '@nestjs/common';


@Injectable()
export class ServicioActualizarFotoUsuario {
  private _repositorioUsuario: RepositorioUsuario;

  constructor(repositorioUsuario: RepositorioUsuario) {
    this._repositorioUsuario = repositorioUsuario;
  }

  async ejecutar(foto: Buffer, userId: string) {
    await this._repositorioUsuario.guardarFoto(foto,userId);
  }
}
