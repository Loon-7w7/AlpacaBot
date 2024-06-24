import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DiscordAuthService } from 'src/Services/DiscordServices/auth/DiscordAuth.service';
import { UserService } from 'src/Services/DiscordServices/user/user.service';

@ApiTags('Discord Auth')
@ApiBearerAuth()
@Controller('discord')
export class DiscordAuthController 
{
    constructor(private authService: DiscordAuthService,
      private DiscordUsers: UserService
    ){}


    @Get('Auth')
    @ApiOperation({ summary: 'Redirect to Discord OAuth2' })
    @Redirect()
    redirectToDiscord() {
      const discordAuthUrl = this.authService.getDiscordAutorizerLink()
      return { url: discordAuthUrl };
    }

    @Get('Callback')
    @ApiOperation({ summary: 'Handle Discord OAuth2 callback' })
    @ApiResponse({ status: 200, description: 'Returns the authenticated user.' })
    async discordCallback(@Query('code') code: string) {
      const token = await this.authService.getDiscordToken(code);
      const user = await this.DiscordUsers.getDiscordUser(token.access_token);
      return user;
    }
}
