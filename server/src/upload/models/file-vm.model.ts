import { ApiModelProperty } from '@nestjs/swagger';
import { BaseModelVm } from '../../shared/base.model';

export class FileVm extends BaseModelVm {
  @ApiModelProperty() OriginalName: string;
  @ApiModelProperty() FileName: string;
  @ApiModelProperty() FileFolder: string;
  @ApiModelProperty() Size: number;
  @ApiModelProperty() Type: number;
}
