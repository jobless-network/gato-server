import { Rule } from './rule.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RulesController } from './rules.controller';
import { RulesService } from './rules.service';
import { TokenCondition } from './token-condition.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rule, TokenCondition])],
  controllers: [RulesController],
  providers: [RulesService]
})
export class RulesModule {}
