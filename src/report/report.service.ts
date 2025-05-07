import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report) private readonly repo: Repository<Report>,
  ) {}

  create(createReportDto: CreateReportDto) {
    const report = this.repo.create(createReportDto);
    return this.repo.save(report);
  }

  findAll(where: Partial<Report>) {
    return this.repo.find({ where });
  }

  async findOne(where: Partial<Report>) {
    const report = await this.repo.findOne({ where });

    if (!report) throw new NotFoundException('Report not found');

    return report;
  }

  findOneById(id: number) {
    return this.findOne({ id });
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
