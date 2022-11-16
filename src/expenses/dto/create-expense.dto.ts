import { ApiProperty } from '@nestjs/swagger';

export class CreateExpenseDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    value: number;
    @ApiProperty()
    description: string;
    @ApiProperty()
    date: Date;
    @ApiProperty()
    frequency: string;
}
