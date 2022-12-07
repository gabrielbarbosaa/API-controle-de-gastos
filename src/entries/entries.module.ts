import { Module } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { EntriesController } from './entries.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Entry, EntrySchema } from './entities/entry.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Entry.name,
      schema: EntrySchema
    }])
  ],
  controllers: [EntriesController],
  providers: [EntriesService],
  exports: [EntriesService]
})
export class EntriesModule {}
