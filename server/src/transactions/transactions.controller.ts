import { Controller, Get, Param } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get(':wallet')
  async getTransactionsByWallet(@Param('wallet') wallet: string) {
    return this.transactionsService.findByReceiverWallet(wallet);
  }
}
