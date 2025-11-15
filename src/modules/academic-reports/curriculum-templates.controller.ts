import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { getCurriculumTemplate } from './curriculum-templates';

@Controller('curriculum-templates')
export class CurriculumTemplatesController {
  @Get()
  getTemplates(
    @Query('curriculum') curriculum: string,
    @Query('grade') grade: string,
  ) {
    if (!curriculum || !grade) {
      throw new BadRequestException('Curriculum and grade parameters are required');
    }

    if (curriculum !== 'merdeka' && curriculum !== 'cambridge') {
      throw new BadRequestException('Curriculum must be either "merdeka" or "cambridge"');
    }

    const gradeNum = parseInt(grade, 10);
    if (isNaN(gradeNum) || gradeNum < 1 || gradeNum > 12) {
      throw new BadRequestException('Grade must be a number between 1 and 12');
    }

    const templates = getCurriculumTemplate(curriculum as 'merdeka' | 'cambridge', gradeNum);

    if (!templates) {
      return {
        curriculum,
        grade: gradeNum,
        subjects: [],
      };
    }

    const subjects = Object.values(templates);

    return {
      curriculum,
      grade: gradeNum,
      subjects,
    };
  }
}
