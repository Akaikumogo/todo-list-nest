import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty()
  readonly userName: string;
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  readonly password: string;
}
