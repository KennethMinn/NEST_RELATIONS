import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReportDto {
  @IsNumber()
  @IsNotEmpty()
  price: number;
}
