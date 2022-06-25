import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rule } from 'src/rules/rule.entity';
import { RulesService } from 'src/rules/rules.service';
import { TokenCondition } from 'src/rules/token-condition.entity';
import { Wallet } from 'src/wallets/wallet.entity';
import { WalletsService } from 'src/wallets/wallets.service';
import { AuthorizationController } from './authorization.controller';
import { AuthorizationService } from './authorization.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rule, TokenCondition, Wallet]), HttpModule],
  controllers: [AuthorizationController],
  providers: [AuthorizationService, RulesService, WalletsService]
})
export class AuthorizationModule {}
