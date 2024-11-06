import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
    @ApiProperty({description: 'Update email', example: "prueba@yopmail.com", required:false})
    readonly email?: string;
    
    @ApiProperty({description: 'Update name', example: "Leidy Santos"})
    readonly name?: string;

    @ApiProperty({description: 'Update username', example: 'LCSA'})
    readonly username?: string;
    
    @ApiProperty({description: 'Update avatar', example: 'https://via.placeholder.com/150'})
    readonly avatar?: string;
}