import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { ConfigurationService } from './shared/configuration/configuration/configuration.service';
import { Configuration } from './shared/configuration/configuration/configuration.enum';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';


@Module({
  imports: [SharedModule, MongooseModule.forRoot(ConfigurationService.connectionString), UserModule, TodoModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {

  static host: string;
  static port: number | string;
  static isDev: boolean;

  constructor(private readonly configurationService: ConfigurationService) {
    AppModule.port = AppModule.normalizePort(configurationService.get(Configuration.PORT));
    AppModule.host = configurationService.get(Configuration.HOST);
    AppModule.isDev = configurationService.isDevelopment;
  }

  private static normalizePort(param: number | string): number | string {
    const portNumber: number = typeof param === 'string' ? parseInt(param, 10) : param;
    if (isNaN(portNumber)) return param;
    else if (portNumber >= 0) return portNumber;
  }
}
