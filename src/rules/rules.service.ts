import { Rule } from './rule.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenCondition } from './token-condition.entity';
import { GateType } from './gate-type';

@Injectable()
export class RulesService {
    constructor(
        @InjectRepository(Rule)
        private rulesRepository: Repository<Rule>,
        @InjectRepository(TokenCondition)
        private conditionsRepository: Repository<TokenCondition>
      ) {}
    
      getRules(): Promise<Rule[]> {
        return this.rulesRepository.find({
            relations: {
                conditions: true,
            },
        });
      }
    
      addRule(rule): Promise<Rule> {
        this.rulesRepository.save(rule);
        return rule;
      }

      getRuleByGate(organization: string, gateType: GateType, gateId: string): Promise<Rule> {
        return this.rulesRepository.findOne({ where: {
            organization: organization,
            gateType: gateType,
            gateId: gateId
        }, 
        relations: {
            conditions: true,
        }})
      }

      ruleExists(organization: string, gateType: GateType, gateId: string): Promise<boolean> {
        return this.rulesRepository.findOne({ where: {
            organization: organization,
            gateType: gateType,
            gateId: gateId
        }})
        .then(rule => !!rule)
      }
}
