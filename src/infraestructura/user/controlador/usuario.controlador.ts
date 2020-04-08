import { Controller, Post, Body, Get, UseInterceptors, UploadedFile, Put, Param } from '@nestjs/common';
import { userCommand } from 'src/aplicacion/usuario/command/registrar-usuario.comando';
import { ManejadorRegistrarUsuario } from 'src/aplicacion/usuario/command/registar-usuario.manejador';
import { ManejadorListarUsuario } from 'src/aplicacion/usuario/consulta/listar-usuarios.manejador';
import { UsuarioDTO } from 'src/dominio/usuario/modelo/usuario.dto';
import {FileInterceptor} from '@nestjs/platform-express'
import { UserPhotoUpdateHandler } from 'src/aplicacion/usuario/command/userPhotoUpdateHandler';
import { userUpdatehandler } from 'src/aplicacion/usuario/command/userUpdatehandler';


@Controller('usuarios')
export class UsuarioControlador {
  constructor(
    private readonly _manejadorRegistrarUsuario: ManejadorRegistrarUsuario,
    private readonly _manejadorListarUsuario: ManejadorListarUsuario,
    private readonly _manejadorActualizarUsuario: userUpdatehandler,
    private readonly _manejadorActualizarFotoUsuario: UserPhotoUpdateHandler,
  ) { }

  @Post()
  async create(@Body() comandoRegistrarUsuario: userCommand) {
    await this._manejadorRegistrarUsuario.ejecutar(comandoRegistrarUsuario);
  }

  @Put(':id')
  async update(@Body() userUpdateCommand: userCommand,@Param('id') userId:string) {
    await this._manejadorActualizarUsuario.ejecutar(userUpdateCommand,userId);
  }

  @Get()
  async listAll(): Promise<UsuarioDTO[]> {
    return await this._manejadorListarUsuario.ejecutar();
  }

  @Post('image/:id')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file, @Param('id') id: string ) {
    this._manejadorActualizarFotoUsuario.ejecutar({photo:file.buffer, userId : id});
  }
}
