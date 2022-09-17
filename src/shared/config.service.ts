import * as winston from 'winston';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NODE_ENV } from 'src/common';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get env(): NODE_ENV {
    return this.configService.get<NODE_ENV>('app.env');
  }
  get name(): string {
    return this.configService.get<string>('app.name');
  }
  get port(): number {
    return Number(this.configService.get<number>('app.port'));
  }
  get logLevel(): string {
    return this.configService.get<string>('app.logLevel');
  }
  get appToken(): string {
    return this.configService.get<string>('app.appToken');
  }
  get refreshToken(): string {
    return this.configService.get<string>('app.refreshToken');
  }
  get baseURL(): string {
    return this.configService.get<string>('app.baseURL');
  }
  get versionType(): number {
    return Number(this.configService.get<number>('app.versionType'));
  }
  get winstonConfig(): winston.LoggerOptions {
    return {
      transports: [
        new winston.transports.Console({
          level: this.logLevel,
          handleExceptions: true,
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp({
              format: 'DD-MM-YYYY HH:mm:ss',
            }),
            winston.format.simple(),
          ),
        }),
      ],
      exitOnError: false,
    };
  }
}
