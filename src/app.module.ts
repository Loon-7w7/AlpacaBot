import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DiscordAuthModule } from './Modules/auth-module/DiscordAuth.module';
import { DiscordAuthService } from './Services/DiscordServices/auth/DiscordAuth.service';
import { HttpModule } from '@nestjs/axios';
import { UserService } from './Services/DiscordServices/user/user.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      isGlobal: true,
    }),
    DiscordAuthModule,
    HttpModule
  ],
  controllers: [],
  providers: [AppService,DiscordAuthService,UserService],
})
export class AppModule {}
