import { Module } from '@nestjs/common';
import { MySQLProviders } from './mysql.provider';

@Module({
  providers: [...MySQLProviders],
  exports: [...MySQLProviders],
})
export class MySQLModule {}
