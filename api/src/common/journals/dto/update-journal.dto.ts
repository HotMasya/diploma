import { ApiProperty } from '@nestjs/swagger';
import { PartialUpdateDto } from './partial-update.dto';

export class UpdateJournaDto extends PartialUpdateDto {
  @ApiProperty()
  columns: [];
}
