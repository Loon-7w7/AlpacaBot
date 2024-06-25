import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { AuthGuard } from 'src/Guars/auth/auth.guard';

@Module({
  imports: [SwaggerModule, HttpModule],
  controllers: [],
  providers: [AuthGuard],
})
export class DiscordServicesModule {}
