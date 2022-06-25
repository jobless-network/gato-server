import { Controller, Get, Query } from '@nestjs/common';
import { GateType } from 'src/rules/gate-type';
import { AuthorizationService } from './authorization.service';

@Controller('authorization')
export class AuthorizationController {
    constructor(private readonly authorizationService: AuthorizationService) {}

    @Get()
    async authorize(
        @Query('address') address: string,
        @Query('organization') organization: string,
        @Query('gateType') gateType: GateType,
        @Query('gateId') gateId: string,
    ) {
        return await this.authorizationService.isAuthorized(address, organization, gateType, gateId);
    }
}
