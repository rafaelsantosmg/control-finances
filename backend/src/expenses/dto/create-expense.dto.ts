import { IsNumber, IsString, IsOptional, IsInt } from 'class-validator';

export class CreateExpenseDto {
  @IsInt()
  @IsOptional()
  id?: number;

  @IsString()
  expense: string;

  @IsOptional()
  description?: string;

  @IsNumber()
  amount: number;

  @IsInt()
  userId: number;
}
