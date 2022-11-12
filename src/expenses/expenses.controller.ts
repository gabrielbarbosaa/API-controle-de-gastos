import { Controller, UseGuards, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { JwtAuthGuard } from '../auth/jwt-auth-guard'

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('expenses')
@ApiTags('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Cria uma despesa e a retorna.',
    type: CreateExpenseDto
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao cadastrar nova despesa.'
  })
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(createExpenseDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lista de despesa retornada com sucesso.',
    type: [CreateExpenseDto]
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado.'
  })
  findAll() {
    return this.expensesService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Usuários retornado com sucesso.',
    type: CreateExpenseDto
  })
  @ApiParam({
    name: 'id'
  })
  findOne(@Param('id') id: string) {
    return this.expensesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expensesService.update(id, updateExpenseDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Despesa deletada com sucesso.'
  })
  @ApiParam({
    name: 'id'
  })
  remove(@Param('id') id: string) {
    return this.expensesService.remove(id);
  }
}
