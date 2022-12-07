import { Entry } from './entities/entry.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { CreateEntryDto } from './dto/create-entry.dto';

@Injectable()
export class EntriesService {
  constructor(@InjectModel(Entry.name) private entryModel: Model<Entry>){

  }
  
  async create(createExpenseDto: CreateEntryDto) {
    const new_expense = await new this.entryModel(createExpenseDto)
    return new_expense.save();
  }

  async findAll() {
    return this.entryModel.find().exec();
  }

  async findOne(id: string) {
    return this.entryModel.findById(id).exec();
  }

  async update(id: string, updateEntryDto: UpdateEntryDto) {
    await this.entryModel.findByIdAndUpdate(id, updateEntryDto).exec();

    return this.findOne(id);
  }

  async remove(id: string) {
    const delete_entry = this.entryModel.findOneAndDelete({_id: id}).exec();
    return (await delete_entry).remove()
  }
}
