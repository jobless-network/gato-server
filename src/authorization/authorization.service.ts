import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { GateType } from 'src/rules/gate-type';
import { RulesService } from 'src/rules/rules.service';
import { TokenCondition } from 'src/rules/token-condition.entity';
import { setFlagsFromString } from 'v8';
import Web3 from 'web3';

@Injectable()
export class AuthorizationService {    
    constructor(
        private readonly httpService: HttpService,
        private readonly rulesService: RulesService
    ) {}

    async isConditionMet(condition : TokenCondition, address: string) : Promise<boolean> {
        let balances = await this.getTokenBalances(address, condition.chainId);

        return this.hasRequiredTokens(condition.contractAddress, condition.amount, balances);
    } 
    
    async isAuthorized(
        address: string,
        signature: string,
        organization: string,
        gateType: GateType,
        gateId: string
    ) : Promise<boolean> {
        let message = "GATO Access Control"

        if (!this.isWalletOwner(signature, message, address)) { 
            console.log("Signature is not valid");

            return false 
        };
        
        let rule = await this.rulesService.getRuleByGate(organization, gateType, gateId);

        return Promise.all(rule.conditions.map((condition) => { return this.isConditionMet(condition, address) }))
            .then(flags => rule.meetAllConditions ? flags.every(Boolean) : flags.some(Boolean))
    }

    async getTokenBalances(address: string, chainId: number) {
        const requestPath = `https://api.covalenthq.com/v1/${chainId}/address/${address}/balances_v2/?quote-currency=USD&format=JSON&nft=true&no-nft-fetch=true&key=ckey_22c84858549c49609ff3e2cd9c8`
        
        return (await firstValueFrom(this.httpService.get(requestPath))).data.data
    }

    hasRequiredTokens(contractAddress: string, amount: number, data) : boolean {
        return data.items.some((tokenData) => 
            tokenData.contract_address === contractAddress && parseInt(tokenData.balance, 10) >= amount
        );
    }

    async isRequired(organization: string, gateType: GateType, gateId: string) {
        return await this.rulesService.ruleExists(organization, gateType, gateId);
    }

    isWalletOwner(signature: string, message: string, address: string) {
        const { verifyMessage } = require('@ethersproject/wallet');

        const recoveredAddress = verifyMessage(message, signature).toLowerCase();
        
        return !!(recoveredAddress === address.toLowerCase());
    }
}
