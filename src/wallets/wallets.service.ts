import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Wallet } from './wallet.entity';

@Injectable()
export class WalletsService {
    constructor(
        @InjectRepository(Wallet)
        private walletRepository: Repository<Wallet>
    ) {}

    async addWallet(address): Promise<Wallet> {
        let wallet = await this.walletRepository.findOne({ where: { address: address } });

        if (!wallet) {
            wallet = await this.walletRepository.save({ wallet: address, nonce: this.genertateNonce() });
        }

        return wallet;
    }

    async getWallet(address): Promise<Wallet> {
        return await this.walletRepository.findOne({ where: { address: address } });
    }

    genertateNonce() {
        const crypto = require('crypto');
        
        return crypto.randomBytes(16).toString('base64');
    }
}
