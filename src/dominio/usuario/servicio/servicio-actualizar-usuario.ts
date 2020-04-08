import { RepositorioUsuario } from '../puerto/repositorio/repositorio-usuario';
import { Usuario } from '../modelo/usuario';
import { Injectable } from '@nestjs/common';
import { ErrorDeNegocio } from 'src/dominio/excepciones/error-de-negocio';

@Injectable()
export class ServicioActulizarUsuario {
  private _repositorioUsuario: RepositorioUsuario;

  constructor(repositorioUsuario: RepositorioUsuario) {
    this._repositorioUsuario = repositorioUsuario;
  }

  async ejecutar(usuario: Usuario,userId: string) {
    if (!await this._repositorioUsuario.existeIdUsuario(userId)) {
      throw new ErrorDeNegocio(
        `user with id: ${userId} doesnt exist`,
      );
    }
    await this._repositorioUsuario.actualizar(usuario,userId);
  }
}
