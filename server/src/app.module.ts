import { Module, MulterModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Configuration } from './shared/configuration/configuration.enum';
import { ConfigurationService } from './shared/configuration/configuration.service';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { SliderModule } from './slider/slider.module';
import * as multer from 'multer';

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
    // MulterModule.register({
    //   dest: '/public',
    //   fileFilter: (req, file, cb) => {
    //     // accept image only
    //     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    //       return cb(new Error('Only image files are allowed!'), false);
    //     }
    //
    //     cb(null, true);
    //     // To reject this file pass `false` or throw Exception, like so:
    //     // cb(new HttpException ("File format is not valid", HttpStatus.BAD_REQUEST), false)
    //   },
    //   limits: {
    //     fileSize: 2097152, // 2 Megabytes
    //   },
    //   storage: multer.diskStorage({
    //     destination(req, file, cb) {
    //       cb(null, './public');
    //     },
    //     filename(req, file, cb) {
    //       cb(null, file.fieldname + '-' + Date.now());
    //     },
    //   }),
    // }),
    UserModule,
    SliderModule,
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
