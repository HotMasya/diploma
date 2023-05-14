import { ApiProperty } from '@nestjs/swagger';

export class FindLogsDto {
  @ApiProperty()
  skip: number;

  @ApiProperty()
  take: number;

  @ApiProperty()
  journalId: number;
}
