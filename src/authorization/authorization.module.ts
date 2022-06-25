import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rule } from 'src/rules/rule.entity';
import { RulesService } from 'src/rules/rules.service';
import { TokenCondition } from 'src/rules/token-condition.entity';
import { AuthorizationController } from './authorization.controller';
import { AuthorizationService } from './authorization.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rule, TokenCondition]), HttpModule],
  controllers: [AuthorizationController],
  providers: [AuthorizationService, RulesService]
})
export class AuthorizationModule {}
