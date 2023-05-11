import { ApiProperty } from '@nestjs/swagger';
import { AdminFindDto } from '../../../dto/admin-find.dto';

export class FindStudentsDto extends AdminFindDto {
  @ApiProperty()
  groupId?: number;
}
