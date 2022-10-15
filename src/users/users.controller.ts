import { Controller, UseGuards, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth-guard'

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Cria um usuário e o retorna.',
    type: CreateUserDto
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao cadastrar usuário.'
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários retornada com sucesso.',
    type: [CreateUserDto]
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado.'
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Usuários retornado com sucesso.',
    type: CreateUserDto
  })
  @ApiParam({
    name: 'id'
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Retorna usuário editado.',
    type: CreateUserDto
  })
  @ApiParam({
    name: 'id'
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Usuário deletado com sucesso.'
  })
  @ApiParam({
    name: 'id'
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
