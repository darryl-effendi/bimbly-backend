import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademicReportsController } from './academic-reports.controller';
import { CurriculumTemplatesController } from './curriculum-templates.controller';
import { AcademicReportsService } from './academic-reports.service';
import { StudentAcademicReport } from './entities/student-academic-report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentAcademicReport])],
  controllers: [AcademicReportsController, CurriculumTemplatesController],
  providers: [AcademicReportsService],
  exports: [AcademicReportsService],
})
export class AcademicReportsModule {}
