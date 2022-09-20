import { ConfigModule } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { AppConfigService } from 'src/shared/config.service';
import { MysqlConfigService } from './mysql.config-service';

export const MySQLProviders = [
  {
    provide: 'SEQUELIZE',
    imports: [ConfigModule],
    inject: [AppConfigService],
    useFactory: async (configService: MysqlConfigService) => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        port: +configService.mysqlPort,
        username: configService.mysqlUsername,
        password: configService.mysqlPassword,
        database: configService.mysqlDBSchema,
        logging: false,
        replication: {
          read: [
            {
              host: configService.mysqlReaderHost,
            },
          ],
          write: {
            host: configService.mysqlWriterHost,
          },
        },
      });

      sequelize.addModels([]);

      return sequelize;
    },
  },
];
