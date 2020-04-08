import { Usuario } from '../../modelo/usuario';

export abstract class RepositorioUsuario {
  abstract async existeIdUsuario(nombre: string): Promise<boolean>;
  abstract async guardar(usuario: Usuario);
  abstract async actualizar(usuario: Usuario,userId: string);
  abstract async guardarFoto(foto: Buffer, userId: string);
}
