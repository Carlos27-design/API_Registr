import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Rol extends Document {
  @Prop({ unique: true, required: true })
  nombre: string;

  @Prop({ required: true })
  descripcion: string;
}

export const RolSchema = SchemaFactory.createForClass(Rol);
