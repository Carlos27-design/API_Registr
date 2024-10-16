import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Types } from 'mongoose';

@Schema()
export class Usuario {
  _id?: string;
  @Prop({ unique: true, required: true })
  email: string;
  @Prop({ minlength: 8, required: true })
  password?: string;
  @Prop({ required: true })
  name: string;
  @Prop({ requerid: true, default: true })
  isActive: boolean;
  @Prop({ type: Types.ObjectId, ref: 'Rol', required: true })
  roles: Types.ObjectId;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
