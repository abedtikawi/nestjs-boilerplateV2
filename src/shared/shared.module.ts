import { Module, Global } from '@nestjs/common';
import { AppConfigService } from './config.service';
import { ConfigModule } from '@nestjs/config';
import configuration from '../configuration/app/configuration';

const providers = [AppConfigService];

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      expandVariables: true,
    }),
  ],
  providers: [...providers],
  exports: [...providers],
})
export class SharedModule {}
