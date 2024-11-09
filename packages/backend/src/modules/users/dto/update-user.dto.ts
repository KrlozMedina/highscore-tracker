import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'Pepito Perez', description: 'Nombre del jugador' })
  name?: string | null

  @ApiProperty({ example: 'Pepito Perez', description: 'Nombre del jugador' })
  username?: string | null

  // @ApiProperty({ example: 'Url o nombre del archivo', description: 'Imagen del jugador' })
  // avatar?: string | null

  @ApiProperty({ example: 'pepito@gmail.com', description: 'Email del jugador', required: true })
  email: string
  
  @ApiProperty({ example: '["ADMIN", "PLAYER"]', description: 'Roles que puede tener el jugador' })
  roles: ['PLAYER']
}