import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ReportModule } from './report/report.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Report } from './report/entities/report.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './commons/guards/auth.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Report],
      synchronize: true,
    }),
    UserModule,
    ReportModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
