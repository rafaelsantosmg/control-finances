import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/expense.entity';

@Injectable()
export class ExpensesService {
  constructor(private prisma: PrismaService) {}

  async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    const data = createExpenseDto;

    return this.prisma.expense.create({ data });
  }

  async findAll(): Promise<Expense[]> {
    const expenses = await this.prisma.expense.findMany();

    if (!expenses) {
      throw new Error('No expenses found');
    }

    return expenses;
  }

  async findOne(id: number): Promise<Expense> {
    const expenseExists = await this.prisma.expense.findUnique({
      where: { id },
    });

    if (!expenseExists) {
      throw new Error('Expense not found');
    }

    return expenseExists;
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    const expenseExists = await this.prisma.expense.findUnique({
      where: { id },
    });

    if (!expenseExists) {
      throw new Error('Expense not found');
    }

    const data = await this.prisma.expense.update({
      where: { id },
      data: updateExpenseDto,
    });

    return data;
  }

  async remove(id: number) {
    const expense = await this.findOne(id);

    if (!expense) {
      throw new Error('Expense not found');
    }

    await this.prisma.expense.delete({ where: { id } });

    return 'Expense deleted';
  }
}
