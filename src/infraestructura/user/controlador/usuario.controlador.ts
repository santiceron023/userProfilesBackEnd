import { Controller, Post, Body, Get, UseInterceptors, UploadedFile, Put, Param } from '@nestjs/common';
import { userCommand } from 'src/aplicacion/usuario/command/registrar-usuario.comando';
import { ManejadorRegistrarUsuario } from 'src/aplicacion/usuario/command/registar-usuario.manejador';
import { ManejadorListarUsuario } from 'src/aplicacion/usuario/consulta/listar-usuarios.manejador';
import { UsuarioDTO } from 'src/dominio/usuario/modelo/usuario.dto';
import {FileInterceptor} from '@nestjs/platform-express'
import { UserPhotoUpdateHandler } from 'src/aplicacion/usuario/command/userPhotoUpdateHandler';
import { userUpdatehandler } from 'src/aplicacion/usuario/command/userUpdatehandler';
import { UserGetByIdHnadler } from 'src/aplicacion/usuario/consulta/userGetByIdhandler';


@Controller('usuarios')
export class UsuarioControlador {
  constructor(
    private readonly _manejadorRegistrarUsuario: ManejadorRegistrarUsuario,
    private readonly _manejadorListarUsuario: ManejadorListarUsuario,
    private readonly _manejadorActualizarUsuario: userUpdatehandler,
    private readonly _manejadorListarPorId: UserGetByIdHnadler,
    private readonly _manejadorActualizarFotoUsuario: UserPhotoUpdateHandler,
  ) { }

  @Post()
  async create(@Body() comandoRegistrarUsuario: userCommand): Promise<string> {
    return await this._manejadorRegistrarUsuario.ejecutar(comandoRegistrarUsuario);
  }

  @Put(':id')
  async update(@Body() userUpdateCommand: userCommand,@Param('id') userId:string) {
    await this._manejadorActualizarUsuario.ejecutar(userUpdateCommand,userId);
  }

  @Get()
  async listAll(): Promise<UsuarioDTO[]> {
    return await this._manejadorListarUsuario.ejecutar();
  }

  @Get(':id')
  async getById(@Param('id') id:string): Promise<UsuarioDTO> {
    return await this._manejadorListarPorId.ejecutar(id);
  }

  @Post('image/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file, @Param('id') id: string ) : Promise<Buffer>{
    await this._manejadorActualizarFotoUsuario.ejecutar({photo:file.buffer, userId : id});
    return Promise.resolve(file.buffer); 
  }
}
