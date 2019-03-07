import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from 'typegoose';
import { BaseService } from '../shared/base.service';
import { MapperService } from '../shared/mapper/mapper.service';
import { Profile } from './models/profile.model';

@Injectable()
export class ProfileService extends BaseService<Profile> {
  constructor(
    @InjectModel(Profile.modelName) private readonly profileModel: ModelType<Profile>,
    private readonly mapperService: MapperService,
  ) {
    super();
    this.model = profileModel;
    this.mapper = mapperService.mapper;
  }
}
