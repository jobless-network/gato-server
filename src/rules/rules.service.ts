import { Rule } from './rule.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RulesService {
    constructor(
        @InjectRepository(Rule)
        private rulesRepository: Repository<Rule>,
      ) {}
    
      getRules(): Promise<Rule[]> {
        return this.rulesRepository.find();
      }
    
      addRule(rule): Promise<Rule> {
        this.rulesRepository.insert(rule);
        return rule;
      }
}
