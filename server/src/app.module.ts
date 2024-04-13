import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsModule } from './transactions/transactions.module';
import { UsersModule } from './users/users.module';
import { EventHandlerModule } from './event-handler/event-handler.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_URL),
    TransactionsModule,
    UsersModule,
    EventHandlerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
