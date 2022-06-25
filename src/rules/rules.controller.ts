import { Body, Controller, Get, Post } from '@nestjs/common';
import { ContractType } from './contract-type';
import { GateType } from './gate-type';
import { RulesService } from './rules.service';

type TokenConditionDto = {
    chainId: number;
    contractAddress: String;
    contractType: ContractType;
    amount: number;
}

type CreateRuleDto = {
    organization: string;
    meetAllConditions?: boolean;
    conditions: TokenConditionDto[];
    gateType: GateType;
    gateId: string;
  };

@Controller('rules')
export class RulesController {
    constructor(private readonly rulesService: RulesService) {}

    @Get()
    getRules() {
        return this.rulesService.getRules();
    }

    @Post()
    addRule(@Body() rule: CreateRuleDto) {
        return this.rulesService.addRule(rule);
    }
}
