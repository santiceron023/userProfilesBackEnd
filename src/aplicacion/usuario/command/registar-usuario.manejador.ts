import { Injectable } from '@nestjs/common';
import { userCommand } from './registrar-usuario.comando';
import { Usuario } from 'src/dominio/usuario/modelo/usuario';
import { ServicioRegistrarUsuario } from 'src/dominio/usuario/servicio/servicio-registrar-usuario';
import { promises } from 'dns';

@Injectable()
export class ManejadorRegistrarUsuario {
  constructor(private _servicioRegistrarUsuario: ServicioRegistrarUsuario) {}

  async ejecutar(comandoRegistrarUsuario: userCommand): Promise<string> {
    return await this._servicioRegistrarUsuario.ejecutar(
      new Usuario(
        comandoRegistrarUsuario.name,
        comandoRegistrarUsuario.description
      ),
    );
  }
}
