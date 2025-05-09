import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { Repository } from 'typeorm';
import { QueryReportDto } from './dto/query-report.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report) private readonly repo: Repository<Report>,
  ) {}

  create(createReportDto: CreateReportDto, user: User) {
    const report = this.repo.create(createReportDto);
    report.user = user;
    return this.repo.save(report);
  }

  findAll(where: QueryReportDto) {
    return this.repo.find({ where, relations: ['user'] });
  }

  async findOneById(id: number) {
    const report = await this.repo.find({ where: { id }, relations: ['user'] });

    if (!report) throw new NotFoundException('Report not found');

    return report;
  }

  async update(id: number, updateReportDto: UpdateReportDto) {
    const report = await this.findOneById(id);

    Object.assign(report, updateReportDto);

    return this.repo.save(report);
  }

  async remove(id: number) {
    const report = await this.findOneById(id);
    return this.repo.remove(report);
  }
}
