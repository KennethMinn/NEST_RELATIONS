import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class QueryReportDto {
  @Type(() => Number)
  @IsOptional()
  price: number;
}
