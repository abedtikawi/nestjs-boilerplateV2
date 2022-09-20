import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './components/users/users.module';
import { MySQLModule } from './database/mysql/mysql.module';

@Module({
  imports: [SharedModule, UsersModule, MySQLModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
