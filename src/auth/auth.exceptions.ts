import { HttpException, HttpStatus } from '@nestjs/common';

export class Exceptions {
  static EmailIsNotFound(): HttpException {
    throw new HttpException({
        statusCode: 400,
        error: 'Bad request',
        message: ['Email não encontrado'],
      },HttpStatus.BAD_REQUEST,
    );
  }

  static InvalidPassword():HttpException{
    throw new HttpException({
        statusCode: 400,
        error: 'Bad request',
        message: ['Senha inválida']
    }, HttpStatus.BAD_REQUEST)
  }

  static EmailAlreadyRegistred():HttpException{
    throw new HttpException({
        statusCode: 400,
        error: 'Bad request',
        message: ['Email já registrado']
    }, HttpStatus.BAD_REQUEST)
  }
}