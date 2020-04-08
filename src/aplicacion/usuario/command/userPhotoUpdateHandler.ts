import { Injectable } from '@nestjs/common';
import { UserPhotoUpdateCommand } from './UserPhotoUpdateCommand';
import { ServicioActualizarFotoUsuario } from 'src/dominio/usuario/servicio/servicio-actualizar-foto-usuario';

@Injectable()
export class UserPhotoUpdateHandler {
  constructor(private _servicioActualizarFotoUsuario: ServicioActualizarFotoUsuario) {}

  async ejecutar(userPhotoUpdateCommand: UserPhotoUpdateCommand) {
    await this._servicioActualizarFotoUsuario.ejecutar(
      userPhotoUpdateCommand.photo,
      userPhotoUpdateCommand.userId);
  }
}
