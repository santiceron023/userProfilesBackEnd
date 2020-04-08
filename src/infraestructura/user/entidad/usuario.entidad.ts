import { Entity, Column, ObjectIdColumn, ObjectID, Binary } from 'typeorm';

@Entity({ name: 'usuario' })
export class UsuarioEntidad {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  photo: Buffer;
}
