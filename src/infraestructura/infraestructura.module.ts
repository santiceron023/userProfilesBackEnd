import { Module, Logger } from '@nestjs/common';
import { UsuarioModule } from './user/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [Logger],
  imports: [TypeOrmModule.forRoot(), UsuarioModule],
})
export class InfraestructuraModule {}
