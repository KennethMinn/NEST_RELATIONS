import { Expose, Transform } from 'class-transformer';

export class ReportDto {
  @Expose()
  price: number;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
