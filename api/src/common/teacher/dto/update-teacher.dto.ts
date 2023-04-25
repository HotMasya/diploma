import { ApiProperty } from '@nestjs/swagger';

export class UpdateTeacherDto {
  @ApiProperty()
  departmentIds: number[];
}
