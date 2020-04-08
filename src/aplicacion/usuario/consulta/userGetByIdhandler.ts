import { Injectable } from '@nestjs/common';
import { DaoUsuario } from 'src/dominio/usuario/puerto/dao/dao-usuario';
import { UsuarioDTO } from 'src/dominio/usuario/modelo/usuario.dto';

@Injectable()
export class UserGetByIdHnadler {
  constructor(private _userDao : DaoUsuario) {}

  async ejecutar(userId: string): Promise<UsuarioDTO> {
    return await this._userDao.getById(userId);
  }
}
