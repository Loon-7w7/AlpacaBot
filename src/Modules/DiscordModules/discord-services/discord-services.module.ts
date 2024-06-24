import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { AuthGuard } from 'src/Guars/auth/auth.guard';
import { UserService } from 'src/Services/DiscordServices/user/user.service';

@Module({
    imports:[
        SwaggerModule,
        HttpModule
    ],
    controllers:[],
    providers:[AuthGuard]
})
export class DiscordServicesModule {
    
}
