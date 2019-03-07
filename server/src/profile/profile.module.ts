import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { Profile } from './models/profile.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: Profile.modelName, schema: Profile.model.schema }])],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {
}
