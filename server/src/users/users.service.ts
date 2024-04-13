import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async setUsername(wallet: string, username: string) {
    return this.usersRepository.setUsername(wallet, username);
  }

  async getUserByUsername(username: string) {
    return this.usersRepository.findByUsername(username);
  }

  async getUserByWallet(wallet: string) {
    return this.usersRepository.findByWallet(wallet);
  }
}
