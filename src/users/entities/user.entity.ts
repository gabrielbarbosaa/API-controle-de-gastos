import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop()
    name: string;
    @Prop()
    email: string;
    @Prop()
    password: string;
    @Prop()
    age: number;
    @Prop()
    state: string;
    @Prop()
    city: string;
    @Prop()
    birth_date: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);