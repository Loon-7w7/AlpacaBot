import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      response.redirect(
        this.configService.get<string>('REDIRECT_ON_UNAUTHORIZED'),
      );
      return false;
    }

    const token: string = authHeader.split(' ')[1];
    //Verificar

    if (!token) {
      response.redirect(
        this.configService.get<string>('REDIRECT_ON_UNAUTHORIZED'),
      );
      return false;
    }

    return true;
  }
}
