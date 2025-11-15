import { Injectable } from '@nestjs/common';

@Injectable()
export class GradingService {
  gradeMultipleChoice(studentAnswer: string, correctAnswer: string): boolean {
    return studentAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
  }

  gradeShortAnswer(studentAnswer: string, correctAnswer: string): boolean {
    return studentAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
  }

  calculateScore(studentAnswer: string, correctAnswer: string, questionType: string, maxPoints: number): {
    isCorrect: boolean | null;
    pointsEarned: number;
  } {
    if (questionType === 'multiple_choice') {
      const isCorrect = this.gradeMultipleChoice(studentAnswer, correctAnswer);
      return {
        isCorrect,
        pointsEarned: isCorrect ? maxPoints : 0,
      };
    }

    if (questionType === 'short_answer') {
      const isCorrect = this.gradeShortAnswer(studentAnswer, correctAnswer);
      return {
        isCorrect,
        pointsEarned: isCorrect ? maxPoints : 0,
      };
    }

    return {
      isCorrect: null,
      pointsEarned: 0,
    };
  }
}
