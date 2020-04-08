import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';
import { Usuario } from 'src/dominio/usuario/modelo/usuario';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntidad } from '../../entidad/usuario.entidad';
import { Repository } from 'typeorm';
import * as mongodb from 'mongodb';

export class RepositorioUsuarioMongo implements RepositorioUsuario {
  constructor(
    @InjectRepository(UsuarioEntidad)
    private readonly repositorio: Repository<UsuarioEntidad>,
  ) { }

  actualizar(usuario: Usuario, userId: string) {
    let documentID = new mongodb.ObjectId(userId);
    const entidad = new UsuarioEntidad();
    entidad.name = usuario.name;
    entidad.description = usuario.description;
    this.repositorio.update({ id: documentID }, entidad)
  }

  async existeIdUsuario(userId: string): Promise<boolean> {
    if (!userId) return false;
    try {
      let documentID = new mongodb.ObjectId(userId);
      return (await this.repositorio.count({ id: documentID })) > 0;
    } catch (error) {
      return false;
    }
  }

  async guardarFoto(foto: Buffer, userId: string) {
    let documentID = new mongodb.ObjectId(userId);
    this.repositorio.update({ id: documentID }, { photo: foto })
  }

  async guardar(usuario: Usuario) {
    const entidad = new UsuarioEntidad();
    entidad.name = usuario.name;
    entidad.description = usuario.description;
    await this.repositorio.save(entidad);
  }

}
