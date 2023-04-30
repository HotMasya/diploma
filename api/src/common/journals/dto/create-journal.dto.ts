import { ApiProperty } from '@nestjs/swagger';

export class CreateJournalDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  groupId: number;
}
