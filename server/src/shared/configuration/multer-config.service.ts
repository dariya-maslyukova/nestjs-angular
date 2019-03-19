import { HttpException, HttpStatus, Injectable, MulterModuleOptions, MulterOptionsFactory } from '@nestjs/common';
import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';

import { ConfigurationService } from './configuration.service';
import { Configuration } from './configuration.enum';
import { Product } from '../../product/models/product.model';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {

  file = {};
  model: Product;
  fileName: string;

  constructor(private configService: ConfigurationService) {
  }

  createMulterOptions(): MulterModuleOptions {
    return {
      // dest: this.configService.get(Configuration.UPLOAD_PATH),
      dest: 'public/catalog',
      limits: {
        fileSize: 2097152,
      },
      fileFilter: (req: any, file: any, cb: any) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          cb(null, true);
        } else {
          cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
        }
      },
      storage: diskStorage({
        destination: (req: any, file: any, cb: any) => {
          const uploadPath = 'public/catalog';

          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath);
          }
          cb(null, uploadPath);
        },
        filename: (req: any, file: any, cb: any) => {
          this.fileName = this.model.name.replace(' ', '-');

          cb(null, `${this.fileName}-${this.model.sku}`);
        },
      }),
    };
  }
}
