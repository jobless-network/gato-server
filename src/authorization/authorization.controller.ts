import { Controller, Get, Post, Query } from '@nestjs/common';
import { GateType } from 'src/rules/gate-type';
import { AuthorizationService } from './authorization.service';

@Controller('authorization')
export class AuthorizationController {
    constructor(private readonly authorizationService: AuthorizationService) {}

    @Get('/authorized')
    async isAuthorized(
        @Query('address') address: string,
        @Query('signature') signature: string,
        @Query('organization') organization: string,
        @Query('gateType') gateType: GateType,
        @Query('gateId') gateId: string,
    ) {
        return await this.authorizationService.isAuthorized(
            address,
            signature.toLowerCase(),
            organization,
            gateType,
            gateId
        );
    }

    @Get('/required')
    async isReuqired(
        @Query('organization') organization: string,
        @Query('gateType') gateType: GateType,
        @Query('gateId') gateId: string,
    ) {
        return await this.authorizationService.isRequired(organization, gateType, gateId);
    }

    @Get('/signature_request')
    async signatureRequest(
        @Query('address') address: string,
    ) {
        return {
            message: await this.authorizationService.signatureRequest(address)
        };
    }
}
