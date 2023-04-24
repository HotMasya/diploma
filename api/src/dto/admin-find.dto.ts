import { ApiProperty } from '@nestjs/swagger';

export class AdminFindDto {
  @ApiProperty()
  skip?: number;

  @ApiProperty()
  take?: number;

  @ApiProperty()
  search?: string;

  @ApiProperty()
  order?: string;
}
