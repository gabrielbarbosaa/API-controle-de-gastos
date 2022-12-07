import { Controller, UseGuards, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth-guard'
import { EntriesService } from './entries.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('entry')
@ApiTags('entry')
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Cria uma receita e a retorna.',
    type: CreateEntryDto
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao cadastrar nova receita.'
  })
  create(@Body() createEntryDto: CreateEntryDto) {
    return this.entriesService.create(createEntryDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lista de receitas retornada com sucesso.',
    type: [CreateEntryDto]
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado.'
  })
  findAll() {
    return this.entriesService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Usuários retornado com sucesso.',
    type: CreateEntryDto
  })
  @ApiParam({
    name: 'id'
  })
  findOne(@Param('id') id: string) {
    return this.entriesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEntryDto: UpdateEntryDto) {
    return this.entriesService.update(id, updateEntryDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Receita deletada com sucesso.'
  })
  @ApiParam({
    name: 'id'
  })
  remove(@Param('id') id: string) {
    return this.entriesService.remove(id);
  }
}
