import {
  Controller,
  FileInterceptor,
  Post,
  UploadedFile,
  UseInterceptors,
  FilesInterceptor,
  UploadedFiles, Body, HttpException, HttpStatus,
} from '@nestjs/common';
import {
  ApiConsumes,
  ApiImplicitFile,
  ApiUseTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOperation,
} from '@nestjs/swagger';

import { File } from './models/file.model';
import { GetOperationId } from '../shared/utilities/get-operation-id.helper';
import { FileVm } from './models/file-vm.model';
import { UploadService } from './upload.service';
import { multerOptions } from '../../config/multer.config';

@Controller('upload')
@ApiUseTags(File.modelName)
export class UploadController {

  constructor(
    private uploadService: UploadService,
  ) {
  }

  @Post('file')
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({ name: 'file', required: true, description: 'Image of slide' })
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadFile(
    @UploadedFile() file,
  ) {
    console.log(file);
  }

  @Post('files')
  // @ApiCreatedResponse({ type: FileVm })
  // @ApiBadRequestResponse({ type: ApiException })
  @ApiOperation(GetOperationId(File.modelName, 'Upload'))
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({ name: 'files', required: true, description: 'Upload Files to server' })
  @UseInterceptors(FilesInterceptor('files', 20))
  async logFiles(@UploadedFiles() files, @Body() data): Promise<FileVm> {
    console.log(files);
    // Create a form data object
    const formData = new FormData();

    // Optional, if you want to use a DTO on your server to grab this data
    formData.append('title', data.title);

    // Append each of the files
    files.forEach((file) => {
      formData.append('files', file.rawFile, file.name);
    });

    try {
      const uploads = await this.uploadService.create(files);
      return this.uploadService.map<FileVm>(uploads);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    // return 'Done';

  }

}
