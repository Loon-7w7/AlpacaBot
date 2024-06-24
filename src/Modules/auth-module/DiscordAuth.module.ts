import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { DiscordAuthController } from 'src/Controllers/DiscordContollers/discord-auth/discord-auth.controller';
import { AuthGuard } from 'src/Guars/auth/auth.guard';
import { DiscordAuthService } from 'src/Services/DiscordServices/auth/DiscordAuth.service';
import { UserService } from 'src/Services/DiscordServices/user/user.service';

@Module({
    imports:[
        SwaggerModule,
        HttpModule
    ],
    controllers:[ DiscordAuthController],
    providers:[DiscordAuthService,UserService, AuthGuard]
})
export class DiscordAuthModule {}
