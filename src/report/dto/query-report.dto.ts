import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class QueryReportDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  price: number;
}
