import { Injectable } from '@nestjs/common';
import { ModelType } from 'typegoose';
import { InjectModel } from '@nestjs/mongoose';

import { BaseService } from '../shared/base.service';
import { MapperService } from '../shared/mapper/mapper.service';
import { File } from './models/file.model';

@Injectable()
export class UploadService extends BaseService<File> {

  constructor(
    @InjectModel(File.modelName) private readonly uploadModel: ModelType<File>,
    private readonly mapperService: MapperService) {
    super();
    this.model = uploadModel;
    this.mapper = mapperService.mapper;
  }
}
