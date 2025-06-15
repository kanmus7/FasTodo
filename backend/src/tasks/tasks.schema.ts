import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Tasks extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ default: false })
  completed: boolean;

  @Prop({ type: String, ref: 'User', required: true })
  userId: string;
}

export type TaskDocument = HydratedDocument<Tasks>;
export const TasksSchema = SchemaFactory.createForClass(Tasks);
