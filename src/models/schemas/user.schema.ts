import { Document } from 'mongoose';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

export interface UserDTO {
  name: string;
  lastName: string;
}

@Schema()
export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  lastName: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
