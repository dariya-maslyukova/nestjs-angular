import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { ApiException } from '../shared/api-exception.model';
import { GetOperationId } from '../shared/utilities/get-operation-id.helper';

import { Profile } from './models/profile.model';
import { ProfileService } from './profile.service';
import { ApiBadRequestResponse, ApiOperation, ApiOkResponse, ApiUseTags } from '@nestjs/swagger';
import { ProfileVm } from './models/view-models/profile-vm.model';

@Controller('profile')
@ApiUseTags(Profile.modelName)
export class ProfileController {

  constructor(private profileService: ProfileService) {

  }

  @Get()
  @ApiOkResponse({ type: ProfileVm, isArray: true })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiOperation(GetOperationId(Profile.modelName, 'GetById'))
  async get(@Param('id') id: string): Promise<ProfileVm> {
    try {
      const profile = await this.profileService.findById(id);
      return this.profileService.map<ProfileVm>(profile.toJSON());
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
