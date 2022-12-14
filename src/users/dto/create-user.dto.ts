import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    age: number;
    @ApiProperty()
    state: string;
    @ApiProperty()
    city: string;
    @ApiProperty()
    birth_date: Date;
}
