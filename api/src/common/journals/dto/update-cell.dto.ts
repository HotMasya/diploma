import { ApiProperty } from '@nestjs/swagger';
import { GridCell } from '../interfaces/grid-cell.interface';

export class UpdateCellDto {
  @ApiProperty()
  index: number;

  @ApiProperty()
  id: string;

  @ApiProperty()
  cell: GridCell;
}
