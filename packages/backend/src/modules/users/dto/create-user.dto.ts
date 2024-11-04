import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({name: 'Pepito Perez'})
    name: string;

    @ApiProperty({name: 'Peperez'})
    username: string;

    @ApiProperty({name: 'Email'})
    email: string;
    
    @ApiProperty({name: 'abc1234yz'})
    password: string;

    @ApiProperty({name: 'player'})
    role: string

    @ApiProperty({name: 'http://image.com'})
    avatar: string;
}