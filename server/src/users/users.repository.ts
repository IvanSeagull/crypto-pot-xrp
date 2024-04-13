import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByWallet(wallet: string) {
    return this.userModel.findOne({ wallet });
  }

  async findByUsername(username: string) {
    return this.userModel.findOne({ username });
  }

  async setUsername(wallet: string, username: string): Promise<User> {
    const ifUserWithWalletExists = await this.findByWallet(wallet);
    // if user with wallet exists, update username
    if (ifUserWithWalletExists) {
      ifUserWithWalletExists.username = username;
      return ifUserWithWalletExists.save();
    }

    const user = {
      wallet,
      username,
      createdAt: new Date(),
    };

    const newUser = new this.userModel(user);
    return newUser.save();
  }
}
