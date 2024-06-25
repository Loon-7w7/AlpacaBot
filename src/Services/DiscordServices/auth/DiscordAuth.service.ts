import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class DiscordAuthService {
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly redirectUri: string;
  private readonly DiscordEndpoit: string;
  private readonly Scope: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.clientId = this.configService.get<string>('DISCORD_CLIENT_ID');
    this.clientSecret = this.configService.get<string>('DISCORD_CLIENT_SECRET');
    this.redirectUri = this.configService.get<string>('DISCORD_REDIRECT_URI');
    this.DiscordEndpoit = this.configService.get<string>(
      'PrincipalEndpointDiscord',
    );
    this.Scope = this.configService.get<string>('DiscordScope');
  }

  async getDiscordToken(code: string): Promise<any> {
    const url = 'https://discord.com/api/oauth2/token';
    const params = new URLSearchParams();
    params.append('client_id', this.clientId);
    params.append('client_secret', this.clientSecret);
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', this.redirectUri);

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const response = await firstValueFrom(
      this.httpService.post(url, params.toString(), { headers }),
    );
    return response.data;
  }

  getDiscordAutorizerLink(): string {
    const UrlRedirect = this.redirectUri
      .replace(':', '%3A')
      .replace('/', '%2F');
    const URL = `https://discord.com/oauth2/authorize?client_id=${this.clientId}&response_type=code&redirect_uri=${UrlRedirect}&scope=${this.Scope}`;
    return URL;
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
