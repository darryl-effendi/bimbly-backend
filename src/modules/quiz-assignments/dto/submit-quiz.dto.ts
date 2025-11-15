import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { SaveAnswerDto } from '../../student-answers/dto/save-answer.dto';

export class SubmitQuizDto {
  @IsArray({ message: 'Answers must be an array' })
  @ValidateNested({ each: true })
  @Type(() => SaveAnswerDto)
  answers: SaveAnswerDto[];
}
