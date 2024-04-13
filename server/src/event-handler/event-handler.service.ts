import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ethers } from 'ethers';
import { TransactionsService } from 'src/transactions/transactions.service';
import { UsersService } from 'src/users/users.service';
import { abi, address } from './utils';

@Injectable()
export class EventHandlerService implements OnModuleInit {
  logger: Logger;
  constructor(
    private readonly usersService: UsersService,
    private readonly transactionService: TransactionsService,
  ) {
    this.logger = new Logger('Contract Events');
  }

  async onModuleInit() {
    const rpc = 'https://rpc-evm-sidechain.xrpl.org';
    const websocket =
      'wss://evm-sidechain-devnet-json-rpc-ws.aws.peersyst.tech.';
    const wsProvider = new ethers.WebSocketProvider(websocket);
    const xrpProvider = new ethers.JsonRpcProvider(rpc);
    const contract = new ethers.Contract(address, abi, wsProvider);
    this.logger.log('Listening for contract events');
    this.logger.log(JSON.stringify(contract));
    contract
      .on('ActivateUser', (param1, param2) => {
        const wallet = param1[0];
        const username = param1[1];
        this.logger.log(`User has been activated: ${wallet}  ${username}`);
        this.usersService.setUsername(wallet, username);
      })
      .catch((error) => {
        console.error('Error listening to events:', error);
      });

    wsProvider.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  }
}
