import { Module } from '@nestjs/common';

import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';
import { RepositorioUsuarioMongo } from './adaptador/repositorio/repositorio-usuario-mongo';
import { UsuarioEntidad } from './entidad/usuario.entidad';
import { UsuarioControlador } from './controlador/usuario.controlador';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManejadorRegistrarUsuario } from 'src/aplicacion/usuario/command/registar-usuario.manejador';
import { DaoUsuario } from 'src/dominio/usuario/puerto/dao/dao-usuario';
import { DaoUsuarioMongo } from './adaptador/dao/dao-usuario-mongo';
import { ManejadorListarUsuario } from 'src/aplicacion/usuario/consulta/listar-usuarios.manejador';
import { UserPhotoUpdateHandler } from 'src/aplicacion/usuario/command/userPhotoUpdateHandler';
import { ServicioActualizarFotoUsuario } from 'src/dominio/usuario/servicio/servicio-actualizar-foto-usuario';
import { ServicioRegistrarUsuario } from 'src/dominio/usuario/servicio/servicio-registrar-usuario';
import { userUpdatehandler } from 'src/aplicacion/usuario/command/userUpdatehandler';
import { ServicioActulizarUsuario } from 'src/dominio/usuario/servicio/servicio-actualizar-usuario';

const repositorioUsuarioProvider = {
  provide: RepositorioUsuario,
  useClass: RepositorioUsuarioMongo,
};
const daoUsuarioProvider = {
  provide: DaoUsuario,
  useClass: DaoUsuarioMongo,
};
@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntidad])],
  providers: [
    ServicioRegistrarUsuario,
    ServicioActualizarFotoUsuario,
    repositorioUsuarioProvider,
    daoUsuarioProvider,
    ManejadorRegistrarUsuario,
    ServicioActulizarUsuario,
    ManejadorListarUsuario,
    userUpdatehandler,
    UserPhotoUpdateHandler
  ],
  controllers: [UsuarioControlador],
})
export class UsuarioModule {}
