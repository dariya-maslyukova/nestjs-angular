import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  InternalServerErrorException, Param,
  Post, Put,
  Query, UseInterceptors, UploadedFile, FileInterceptor,
} from '@nestjs/common';
import { Slider } from './models/slider.model';
import {
  ApiUseTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOperation,
  ApiOkResponse,
  ApiImplicitQuery,
  ApiImplicitFile,
  ApiConsumes,
} from '@nestjs/swagger';
import { SliderService } from './slider.service';
import { ApiException } from '../shared/api-exception.model';
import { GetOperationId } from '../shared/utilities/get-operation-id.helper';
import { SliderVm } from './models/view-models/slider-vm.model';
import { ToBooleanPipe } from '../shared/pipes/to-boolean.pipe';
import { SliderParams } from './models/view-models/slider-params.model';
import { multerOptions } from '../../config/multer.config';
import { BaseModel } from '../shared/base.model';

@Controller('slider')
@ApiUseTags(Slider.modelName)
export class SliderController {

  constructor(
    private readonly sliderService: SliderService,
  ) {
  }

  @Post()
  @ApiCreatedResponse({ type: SliderVm })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiOperation(GetOperationId(Slider.modelName, 'Create'))
  @ApiImplicitQuery({ name: 'IsActive', required: false, description: 'If not selected IsActive is true' })
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({ name: 'file', required: true, description: 'Upload image' })
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async create(
    @Body() params: SliderParams,
    @Query('IsActive', new ToBooleanPipe()) IsActive: boolean,
    @UploadedFile() file,
  ): Promise<SliderVm> {

    if (!file) {
      throw new HttpException('Image is required', HttpStatus.BAD_REQUEST);
    }

    const image = file.path;

    if (!IsActive) {
      params.IsActive = IsActive;
    }

    try {
      const newSlide = await this.sliderService.createSlide(params, image);
      return this.sliderService.map<SliderVm>(newSlide);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @ApiOkResponse({ type: BaseModel })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiOperation(GetOperationId(Slider.modelName, 'GetAll'))
  @ApiImplicitQuery({ name: 'IsActive', required: false })
  async get(
    @Query('IsActive', new ToBooleanPipe()) IsActive?: boolean,
  ): Promise<BaseModel<SliderVm[]>> {
    const filter = {};

    if (IsActive !== null) {
      filter['IsActive'] = IsActive;
    }

    try {
      const sliders = await this.sliderService.findAll(filter, 10);
      return this.sliderService.map<BaseModel<SliderVm[]>>(sliders);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('clear-collection')
  // @Roles(UserRole.Admin)
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiCreatedResponse({ type: SliderVm })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiOperation(GetOperationId(Slider.modelName, 'ClearSliderCollection'))
  async clear(): Promise<SliderVm[]> {
    try {
      return await this.sliderService.clearCollection();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @Put()
  @ApiOkResponse({ type: SliderVm })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiOperation(GetOperationId(Slider.modelName, 'Update'))
  @ApiImplicitQuery({ name: 'IsActive', required: false, description: 'If not selected IsActive is true' })
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({ name: 'file', required: false, description: 'Upload image' })
  @ApiImplicitQuery({ name: 'Link', required: false })
  @ApiImplicitQuery({ name: 'TopText', required: false })
  @ApiImplicitQuery({ name: 'BoldText', required: false })
  @ApiImplicitQuery({ name: 'BotText', required: false })
  @ApiImplicitQuery({ name: 'CaptionText', required: false })
  @ApiImplicitQuery({ name: 'id', required: true })
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async update(
    @Query('Link') Link: string,
    @Query('CaptionText') CaptionText: string,
    @Query('BotText') BotText: string,
    @Query('BoldText') BoldText: string,
    @Query('TopText') TopText: string,
    @Query('IsActive', new ToBooleanPipe()) IsActive: boolean,
    @UploadedFile() file,
    @Query('id') id: string,
  ): Promise<SliderVm> {
    const vm: SliderVm = {
      id,
      IsActive,
      Link,
      TopText,
      BoldText,
      BotText,
      CaptionText,
    };

    if (!vm || !id) {
      throw new HttpException('Missing parameters', HttpStatus.BAD_REQUEST);
    }

    const exist = await this.sliderService.findById(id);

    if (!exist) {
      throw new HttpException(`${id} Not found`, HttpStatus.NOT_FOUND);
    }

    if (file) {
      exist.Image = file.path;
    }
    if (vm.Link) {
      exist.Link = Link;
    }
    if (vm.TopText) {
      exist.TopText = TopText;
    }
    if (vm.BoldText) {
      exist.BoldText = BoldText;
    }
    if (vm.CaptionText) {
      exist.CaptionText = CaptionText;
    }
    if (vm.IsActive !== null) {
      exist.IsActive = IsActive;
    } else {
      exist.IsActive = true;
    }

    try {
      const updated = await this.sliderService.update(id, exist);
      return this.sliderService.map<SliderVm>(updated.toJSON());
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @ApiOkResponse({ type: SliderVm, description: 'Delete OK!' })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiOperation(GetOperationId(Slider.modelName, 'Delete'))
  async delete(@Param('id') id: string): Promise<SliderVm> {
    try {
      const deleted = await this.sliderService.delete(id);
      return this.sliderService.map<SliderVm>(deleted.toJSON());
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

}
