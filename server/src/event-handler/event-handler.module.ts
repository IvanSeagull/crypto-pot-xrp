import { Module } from '@nestjs/common';
import { EventHandlerService } from './event-handler.service';
import { UsersModule } from 'src/users/users.module';
import { TransactionsModule } from 'src/transactions/transactions.module';

@Module({
  imports: [UsersModule, TransactionsModule],
  providers: [EventHandlerService],
})
export class EventHandlerModule {}
