import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  private readonly DiscordEndpoit: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.DiscordEndpoit = this.configService.get<string>(
      'PrincipalEndpointDiscord',
    );
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
  async getUserGuilds(token: string): Promise<any> {
    const url = 'https://discord.com/api/users/@me/guilds';
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.get(url, { headers }),
      );
      const guilds = response.data;
      return guilds.filter((guild) => this.hasManageGuildPermissions(guild));
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  hasManageGuildPermissions(guild: any): boolean {
    const MANAGE_GUILD_PERMISSION = 0x20; // 1 << 5
    const permissions = BigInt(guild.permissions);
    return (
      (permissions & BigInt(MANAGE_GUILD_PERMISSION)) ===
      BigInt(MANAGE_GUILD_PERMISSION)
    );
  }
}
