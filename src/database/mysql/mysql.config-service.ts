import * as winston from 'winston';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NODE_ENV } from 'src/common';

@Injectable()
export class MysqlConfigService {
  constructor(private configService: ConfigService) {}

  get mysqlDBSchema(): string {
    return this.configService.get<string>('db_mysql.database');
  }
  get mysqlUsername(): string {
    return this.configService.get<string>('db_mysql.username');
  }
  get mysqlPassword(): string {
    return this.configService.get<string>('db_mysql.password');
  }
  get mysqlPort(): number {
    return this.configService.get<number>('db_mysql.port');
  }
  get mysqlReaderHost(): string {
    return this.configService.get<string>('db_mysql.readerHost');
  }
  get mysqlWriterHost(): string {
    return this.configService.get<string>('db_mysql.writerHost');
  }
}
