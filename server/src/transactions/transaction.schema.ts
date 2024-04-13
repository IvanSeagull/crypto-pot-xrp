import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
  @Prop()
  sender: string;

  @Prop()
  receiver: string;

  @Prop()
  amount: number;

  @Prop()
  message: string;

  @Prop()
  date: Date;

  @Prop()
  txHash: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
