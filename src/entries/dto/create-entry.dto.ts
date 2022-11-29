import { ApiProperty } from "@nestjs/swagger";
import { Type } from "../entities/entry.entity";

export class CreateEntryDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    value: string;
    @ApiProperty()
    description: string;
    @ApiProperty({enum: Type})
    type: Type
}
