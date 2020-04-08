import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { DaoUsuario } from 'src/dominio/usuario/puerto/dao/dao-usuario';
import { UsuarioDTO } from 'src/dominio/usuario/modelo/usuario.dto';
import { UsuarioEntidad } from '../../entidad/usuario.entidad';
import * as mongodb from 'mongodb';
import { ErrorDeNegocio } from 'src/dominio/excepciones/error-de-negocio';

export class DaoUsuarioMongo implements DaoUsuario {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) { }

  async getById(userId: string): Promise<UsuarioDTO> {
    try {
      let documentID = new mongodb.ObjectId(userId);
      return await this.entityManager.findOne(UsuarioEntidad, documentID);
    } catch (error) {
      throw new ErrorDeNegocio('incorrect ID search');
    }
  }

  async listar(): Promise<UsuarioDTO[]> {
    return await this.entityManager.find(UsuarioEntidad, {});
  }
}
