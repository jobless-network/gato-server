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
        let wallets = await this.walletRepository.find({ where: { address: address } });

        if (wallets.length === 0) {
            return await this.walletRepository.save({ wallet: address, nonce: this.genertateNonce() });
        }

        return wallets[0];
    }

    async getWallet(address): Promise<Wallet> {
        return await this.walletRepository.findOne({ where: { address: address } });
    }

    genertateNonce() {
        const crypto = require('crypto');
        
        return crypto.randomBytes(16).toString('base64');
    }
}
