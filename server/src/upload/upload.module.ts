import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { File } from './models/file.model';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: File.modelName, schema: File.model.schema }])],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {

}
