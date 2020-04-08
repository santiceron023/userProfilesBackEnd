import { Injectable } from '@nestjs/common';
import { ServicioActulizarUsuario } from 'src/dominio/usuario/servicio/servicio-actualizar-usuario';
import { userCommand } from './registrar-usuario.comando';
import { Usuario } from 'src/dominio/usuario/modelo/usuario';

@Injectable()
export class userUpdatehandler {
  constructor(private _updateUserService: ServicioActulizarUsuario) {}

  async ejecutar(userUpdateComand: userCommand, userId: string) {
    await this._updateUserService.ejecutar(
      new Usuario(
        userUpdateComand.name,
        userUpdateComand.description
      ), userId
    );
  }
}
