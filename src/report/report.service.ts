import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { Repository } from 'typeorm';
import { QueryReportDto } from './dto/query-report.dto';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report) private readonly repo: Repository<Report>,
  ) {}

  create(createReportDto: CreateReportDto) {
    const report = this.repo.create(createReportDto);
    return this.repo.save(report);
  }

  findAll(where: QueryReportDto) {
    return this.repo.find({ where });
  }

  async findOneById(id: number) {
    const report = await this.repo.findOne({ where: { id } });

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
