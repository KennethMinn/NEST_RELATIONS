import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Report } from './entities/report.entity';
import { QueryReportDto } from './dto/query-report.dto';
import { CurrentUser } from 'src/commons/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { Serialize } from 'src/commons/interceptors/serialize.interceptor';
import { ReportDto } from './dto/report.dto';
import { AdminGuard } from 'src/commons/guards/admin.guard';

@Controller('reports')
@Serialize(ReportDto)
@UseGuards(AdminGuard)
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  create(@Body() createReportDto: CreateReportDto, @CurrentUser() user: User) {
    console.log(user);
    return this.reportService.create(createReportDto, user);
  }

  @Get()
  findAll(@Query() query: QueryReportDto) {
    return this.reportService.findAll(query);
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.reportService.findOneById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportService.update(+id, updateReportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportService.remove(+id);
  }
}
