import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { SessionSummariesService } from './session-summaries.service';
import { CreateSessionSummaryDto } from './dto/create-session-summary.dto';
import { UpdateSessionSummaryDto } from './dto/update-session-summary.dto';

@Controller('session-summaries')
export class SessionSummariesController {
  constructor(private readonly sessionSummariesService: SessionSummariesService) {}

  @Post()
  create(@Body() createDto: CreateSessionSummaryDto) {
    return this.sessionSummariesService.create(createDto);
  }

  @Get('booking/:bookingId')
  findByBooking(@Param('bookingId') bookingId: string) {
    return this.sessionSummariesService.findByBooking(bookingId);
  }

  @Get('student/:studentId')
  findByStudent(@Param('studentId') studentId: string) {
    return this.sessionSummariesService.findByStudent(studentId);
  }

  @Get('tutor/:tutorId')
  findByTutor(@Param('tutorId') tutorId: string) {
    return this.sessionSummariesService.findByTutor(tutorId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sessionSummariesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateSessionSummaryDto) {
    return this.sessionSummariesService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sessionSummariesService.remove(id);
  }
}
