import { ApiProperty } from '@nestjs/swagger';

export class UpdateStudentDto {
  @ApiProperty()
  groupId?: number;

  @ApiProperty()
  facultyId?: number;
}
