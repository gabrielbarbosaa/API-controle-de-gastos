import { Expense } from './entities/expense.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExpensesService {
  constructor(@InjectModel(Expense.name) private expenseModel: Model<Expense>){

  }
  
  async create(createExpenseDto: CreateExpenseDto) {
    const new_expense = await new this.expenseModel(createExpenseDto)
    return new_expense.save();
  }

  async findAll() {
    return this.expenseModel.find().exec();
  }

  async findOne(id: string) {
    return this.expenseModel.findById(id).exec();
  }

  async update(id: string, updateExpenseDto: UpdateExpenseDto) {
    await this.expenseModel.findByIdAndUpdate(id, updateExpenseDto).exec();

    return this.findOne(id);
  }

  async remove(id: string) {
    const delete_expense = this.expenseModel.findOneAndDelete({_id: id}).exec();
    return (await delete_expense).remove()
  }
}
