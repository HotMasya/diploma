import { ApiProperty } from '@nestjs/swagger';

export class CreateFacultyDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  shortName: string;
}
