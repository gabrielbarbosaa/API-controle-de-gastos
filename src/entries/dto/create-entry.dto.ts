import { ApiProperty } from "@nestjs/swagger";

export class CreateEntryDto {
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
