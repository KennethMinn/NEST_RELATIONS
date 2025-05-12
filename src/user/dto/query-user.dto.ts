import { IsOptional, IsString } from 'class-validator';

export class QueryUserDto {
  @IsOptional()
  @IsString()
  email: string;
}
