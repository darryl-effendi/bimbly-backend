import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AcademicReportsService } from './academic-reports.service';
import { CreateAcademicReportDto } from './dto/create-academic-report.dto';
import { UpdateAcademicReportDto } from './dto/update-academic-report.dto';

@Controller('academic-reports')
export class AcademicReportsController {
  constructor(private readonly academicReportsService: AcademicReportsService) {}

  @Post()
  async create(@Request() req, @Body() createDto: CreateAcademicReportDto) {
    const report = await this.academicReportsService.create(req.user.studentProfileId, createDto);
    return {
      ...report,
      averageScore: this.academicReportsService.calculateAverage(report.subtopicScores),
    };
  }

  @Get()
  async findAll(@Request() req) {
    const reports = await this.academicReportsService.findAllByStudent(req.user.studentProfileId);
    return reports.map(report => ({
      ...report,
      averageScore: this.academicReportsService.calculateAverage(report.subtopicScores),
    }));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const report = await this.academicReportsService.findOne(id);
    return {
      ...report,
      averageScore: this.academicReportsService.calculateAverage(report.subtopicScores),
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateAcademicReportDto) {
    const report = await this.academicReportsService.update(id, updateDto);
    return {
      ...report,
      averageScore: this.academicReportsService.calculateAverage(report.subtopicScores),
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.academicReportsService.remove(id);
  }
}
