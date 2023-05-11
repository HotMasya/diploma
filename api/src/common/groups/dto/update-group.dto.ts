import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupDto } from './create-group.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateGroupDto extends PartialType(CreateGroupDto) {
  @ApiProperty()
  curatorId?: number;
}
