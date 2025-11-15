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
import { ProblemsService } from './problems.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';

@Controller('problems')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}

  @Post()
  create(@Request() req, @Body() createDto: CreateProblemDto) {
    return this.problemsService.create(req.user.id, createDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.problemsService.findAllByUser(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.problemsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Request() req, @Body() updateDto: UpdateProblemDto) {
    return this.problemsService.update(id, req.user.id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.problemsService.remove(id, req.user.id);
  }
}
