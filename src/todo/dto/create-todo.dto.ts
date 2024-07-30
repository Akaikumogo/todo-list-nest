import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty()
  readonly todoName: string;
  @ApiProperty()
  readonly Description: string;
}
