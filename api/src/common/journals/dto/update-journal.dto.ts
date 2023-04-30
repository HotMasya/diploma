import { ApiProperty } from '@nestjs/swagger';

export class UpdateJournaDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  columns: [];

  @ApiProperty()
  data: [][];
}
