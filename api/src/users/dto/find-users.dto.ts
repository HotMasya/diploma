import { ApiProperty } from '@nestjs/swagger';

export class FindUsersDto {
  @ApiProperty()
  skip?: number;

  @ApiProperty()
  take?: number;

  @ApiProperty()
  search?: string;

  @ApiProperty()
  order?: string;
}
