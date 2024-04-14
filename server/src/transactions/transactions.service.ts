import { Injectable } from '@nestjs/common';
import { TransactionsRepository } from './transactions.repository';
import { UsersService } from 'src/users/users.service';
import { AlertsGateway } from 'src/alerts/alerts.gateway';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly usersService: UsersService,
    private readonly alertsGateWay: AlertsGateway,
  ) {}

  async create(
    senderWallet: string,
    receiverWallet: string,
    amount: number,
    message: string,
    txHash: string,
  ) {
    const newTransaction = await this.transactionsRepository.create(
      senderWallet,
      receiverWallet,
      amount,
      message,
      txHash,
    );

    const senderUser = await this.usersService.getUserByWallet(senderWallet);
    let senderData;
    if (senderUser) {
      senderData = {
        username: senderUser.username,
        wallet: senderWallet,
      };
    } else {
      senderData = {
        username: 'Anonymous',
        wallet: senderWallet,
      };
    }
    const toUser = await this.usersService.getUserByWallet(receiverWallet);

    const payload = {
      amount,
      senderData,
      message,
      username: toUser.username,
    };
    await this.alertsGateWay.donate(payload);

    return newTransaction;
  }

  async findByReceiverWallet(walletString) {
    const list: any[] = await this.transactionsRepository.findByReceiverWallet(
      walletString,
    );
    // мне стыдно за это :(
    const newList = [];

    for (let i = list.length - 1; i >= 0; i--) {
      const item: any = {};

      item.sender = list[i].sender;
      item.receiver = list[i].receiver;
      item.amount = list[i].amount;
      item.message = list[i].message;
      item.tokenAddress = list[i].tokenAddress;
      item.txHash = list[i].txHash;
      item.date = list[i].date;

      item.senderUser = await this.usersService.getUserByWallet(item.sender);
      newList.push(item);
    }

    return newList;
  }
}
