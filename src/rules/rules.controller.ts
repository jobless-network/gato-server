import { Body, Controller, Get, Post } from '@nestjs/common';
import { RulesService } from './rules.service';

type Rule = {
    id?: number;
    organization: string;
    meetAllConditions: boolean;
  };

@Controller('rules')
export class RulesController {
    constructor(private readonly rulesService: RulesService) {}

    @Get()
    getRules() {
        return this.rulesService.getRules();
    }

    @Post()
    addRule(@Body() rule: Rule) {
        return this.rulesService.addRule(rule);
    }
}
