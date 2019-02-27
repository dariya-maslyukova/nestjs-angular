import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

import { TodoLevel } from '../todo-level.enum';
import { EnumToArray } from '../../../shared/utilities/enum-to-array.helper';

export class TodoParams {
  @ApiModelProperty() content: string;
  @ApiModelPropertyOptional({ enum: EnumToArray(TodoLevel), example: TodoLevel.Normal })
  level?: TodoLevel;
}
