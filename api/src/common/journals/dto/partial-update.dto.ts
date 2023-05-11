import { ApiProperty } from '@nestjs/swagger';

export class PartialUpdateDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  description?: string;
}
