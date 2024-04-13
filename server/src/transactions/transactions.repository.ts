import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from './transaction.schema';

@Injectable()
export class TransactionsRepository {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
  ) {}

  async create(
    senderWallet: string,
    receiverWallet: string,
    amount: number,
    message: string,
    txHash: string,
  ): Promise<Transaction> {
    const transaction = {
      sender: senderWallet,
      receiver: receiverWallet,
      amount,
      message,
      date: new Date(),
      txHash,
    };
    const newTransaction = new this.transactionModel(transaction);

    return newTransaction.save();
  }

  async findByReceiverWallet(walletString): Promise<Transaction[]> {
    return this.transactionModel.find({ receiver: walletString });
  }
}
