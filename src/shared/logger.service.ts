import * as winston from 'winston';
import { ConsoleLogger, Global, Injectable, Logger } from '@nestjs/common';
import { AppConfigService } from './config.service';
import { LogLevel } from 'src/common/types';
@Global()
@Injectable()
export class LoggerService extends ConsoleLogger {
  private readonly _logger: winston.Logger;
  constructor(private readonly _configService: AppConfigService) {
    super(LoggerService.name, { logLevels: ['log'] });
    this._logger = winston.createLogger(_configService.winstonConfig);
    if (_configService.env !== 'production') {
      this._logger.debug('Logging initialized at debug level');
    }
  }

  public log(message: string): void {
    this._logger.log({
      level: LogLevel.INFO,
      message: message,
    });
  }

  public debug(message: string, stackTrace?: any): void {
    this._logger.log({
      level: LogLevel.DEBUG,
      message: message,
      meta: { stackTrace: stackTrace },
    });
  }

  public error(message: string, stackTrace?: any): void {
    this._logger.log({
      level: LogLevel.ERROR,
      message: message,
      meta: { stackTrace: stackTrace },
    });
  }

  public warn(message: string): void {
    this._logger.log({
      level: LogLevel.WARN,
      message: message,
    });
  }

  public info(message: string): void {
    this._logger.log({
      level: LogLevel.INFO,
      message: message,
    });
  }
}
