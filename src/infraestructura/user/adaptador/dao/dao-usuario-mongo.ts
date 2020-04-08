import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { DaoUsuario } from 'src/dominio/usuario/puerto/dao/dao-usuario';
import { UsuarioDTO } from 'src/dominio/usuario/modelo/usuario.dto';
import { UsuarioEntidad } from '../../entidad/usuario.entidad';
import * as mongodb from 'mongodb';

export class DaoUsuarioMongo implements DaoUsuario {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) { }

  async getById(userId: string): Promise<UsuarioDTO> {
    let documentID = new mongodb.ObjectId(userId);
    return await this.entityManager.findOne(UsuarioEntidad, {});
  }
 
  async listar(): Promise<UsuarioDTO[]> {
    return await this.entityManager.find(UsuarioEntidad, {});
  }
}
