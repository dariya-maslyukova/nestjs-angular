import { Module, MulterModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Configuration } from './shared/configuration/configuration.enum';
import { ConfigurationService } from './shared/configuration/configuration.service';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { SliderModule } from './slider/slider.module';
import { UploadModule } from './upload/upload.module';
import { ConfigurationModule } from './shared/configuration/configuration.model';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    SharedModule,
    MongooseModule.forRootAsync({
      imports: [SharedModule],
      useFactory: async (configService: ConfigurationService) => ({
        uri: configService.get(Configuration.MONGO_URI),
        retryDelay: 500,
        retryAttempts: 3,
        useNewUrlParser: true,
        useCreateIndex: false,
        useFindAndModify: false,
      }),
      inject: [ConfigurationService],
    }),
    ConfigurationModule,
    UserModule,
    SliderModule,
    UploadModule,
    ProductModule,
  ],
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

    if (isNaN(portNumber)) {
      return param;
    } else if (portNumber >= 0) {
      return portNumber;
    }
  }
}
