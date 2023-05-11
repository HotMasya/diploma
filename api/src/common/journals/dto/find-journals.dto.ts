import { ApiProperty } from '@nestjs/swagger';

export class FindJournalsDto {
  @ApiProperty()
  search?: string;

  @ApiProperty()
  take?: number;

  @ApiProperty()
  skip?: number;
}
