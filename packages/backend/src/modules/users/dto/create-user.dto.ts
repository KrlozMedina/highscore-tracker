import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({name: 'Pepito Perez'})
    name: string;

    @ApiProperty({name: 'Email'})
    email: string;

    @ApiProperty({name: 'Peperez'})
    username: string;

    @ApiProperty({name: 'abc1234yz'})
    password: string;

    @ApiProperty({name: 'http://image.com'})
    avatar: string;

    @ApiProperty({name: 'player'})
    roles: string
}

// export class CreateUserDto {
//     readonly email: string;
//     readonly name: string;
//     readonly username: string;
//     readonly avatar: string;
// }