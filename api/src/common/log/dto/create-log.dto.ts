import { ApiProperty } from '@nestjs/swagger';

export class CreateLogDto {
  @ApiProperty()
  studentId: number;

  @ApiProperty()
  teacherId: number;

  @ApiProperty()
  journalId: number;

  @ApiProperty()
  id: string;

  @ApiProperty()
  column: string;

  @ApiProperty()
  index: number;

  @ApiProperty()
  message: string;
}
