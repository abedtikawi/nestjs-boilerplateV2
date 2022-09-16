import * as winston from 'winston';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get env(): string {
    return this.configService.get<string>('app.env');
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
