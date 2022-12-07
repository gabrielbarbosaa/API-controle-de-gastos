import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Entry extends Document {
    @Prop()
    name: string;
    @Prop()
    value: number;
    @Prop()
    description: string;
    @Prop()
    date: Date;
    @Prop()
    frequency: string;
}

export const EntrySchema = SchemaFactory.createForClass(Entry);