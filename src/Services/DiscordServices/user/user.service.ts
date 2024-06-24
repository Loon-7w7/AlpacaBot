import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {
    private readonly DiscordEndpoit:string;

    constructor(
        private httpService: HttpService,
        private configService: ConfigService,)
    {
        this.DiscordEndpoit = this.configService.get<string>('PrincipalEndpointDiscord');
    }
    async getDiscordUser(token: string): Promise<any> {
        const url = this.DiscordEndpoit + '/users/@me';
        const headers = {
          Authorization: `Bearer ${token}`,
        };
    
        const response = await firstValueFrom(
          this.httpService.get(url, { headers }),
        );
        return response.data;
      }
}
