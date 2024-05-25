import { Request, Response } from 'express';
import { UserUseCase } from '../useCases/userUseCase';
import { IsEmail, IsNotEmpty, IsString, validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { CpfBeingUsed, EmailBeingUsed, PhoneBeingUsed, UserNotFound } from '../errors/userErro';
import validator from 'validator';

// Controlador que lida com as requisições HTTP relacionadas a usuários
export class UserController {
  userUseCase = new UserUseCase(); // Instância da classe de casos de uso de usuários

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id; // Obtém o ID do usuário dos parâmetros da URL
      const isUuid = validator.isUUID(userId)
      if (!isUuid) {
        res.status(400).json({
          message: `The id ${userId} is not valid.`
        })
      }
      const user = await this.userUseCase.getById(userId); // Busca o usuário pelo ID
      if (user) {
        res.status(200).json(user); // Retorna o usuário encontrado com status 200
      } else {
        res.status(404).json({ message: 'User not found' }); // Retorna erro 404 se o usuário não for encontrado
      }
    } catch (error) {
      console.error('Error fetching user by ID:', error); // Log de erro no servidor
      res.status(500).json({
        message: 'Internal server error'
      }); // Retorna erro 500 em caso de falha interna
    }
  }

  async getAll(res: Response) {
    try {
      const users = await this.userUseCase.getAll()

      res.status(200).json(users)
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      res.status(500).json({
        message: 'Internal server error'
      })
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const createUserDto = plainToClass(CreateUserDTO, req.body); // Converte o corpo da requisição para a classe DTO
      const errors = await validate(createUserDto); // Valida os dados do DTO

      if (errors.length > 0) {
        res.status(400).json({ errors: errors.map(error => error.constraints) }); // Retorna erros de validação com status 400
        return;
      }
      // TODO: Validar CPF
      // TODO: Validar email
      // TODO: Validar telefone
      // TODO: Validar senha

      const user = await this.userUseCase.create(createUserDto); // Cria o usuário usando a classe de casos de uso
      res.status(201).json(user); // Retorna o usuário criado com status 201
    } catch (error) {

      // TODO: ISTO ETÁ UMA MERDA
      const isUserError = error instanceof EmailBeingUsed || error instanceof CpfBeingUsed || error instanceof PhoneBeingUsed

      if (isUserError) {
        res.status(400).json({
          message: error.message
        });
        return
      }
      console.error('Error creating user:', error); // Log de erro no servidor
      res.status(500).json({ message: 'Internal server error' }); // Retorna erro 500 em caso de falha interna
    }
  }
  async update(req: Request, res: Response): Promise<void> {
    try {
      const updateUserParams:
        {
          name?: string,
          email?: string,
          cpf?: string,
          password?: string,
          phone?: string,
          role?: string
        }
        = req.body

      if (updateUserParams.email) {
        const isEmail = validator.isEmail(updateUserParams.email)
        if (!isEmail) {
          res.status(400).json({
            message: 'Email not valid'
          });
        }
      }
      // TODO: Validar CPF
      // TODO: Validar senha
      
      if (updateUserParams.password) {
        const isStrongPassword = validator.isStrongPassword(updateUserParams.password)
        if (!isStrongPassword) {
          res.status(400).json({
            message: 'Very easy password'
          });
        }
      }

      const user = await this.userUseCase.update(req.params.id, updateUserParams)

      if (user){
        res.status(200).json(user)
      }else{
        res.status(400).json({
          message:'User not found'
        })
      }
    } catch (error) {

      // TODO: ISTO ETÁ UMA MERDA
      const isUserError = error instanceof EmailBeingUsed || error instanceof CpfBeingUsed || error instanceof PhoneBeingUsed || error instanceof UserNotFound

      if (isUserError) {
        res.status(400).json({
          message: error.message
        });
        return
      }
      console.error('Error creating user:', error); // Log de erro no servidor
      res.status(500).json({ message: 'Internal server error' }); // Retorna erro 500 em caso de falha interna
    }
  }
}

// Classe DTO para validação e transformação de dados de criação de usuário
class CreateUserDTO {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name!: string

  @IsNotEmpty({ message: 'Cpf is required' })
  @IsString({ message: 'Cpf must be a string' })
  cpf!: string

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  password!: string

  @IsNotEmpty({ message: 'Phone is required' })
  @IsString({ message: 'Phone must be a string' })
  phone!: string

  @IsNotEmpty({ message: 'Role is required' })
  @IsString({ message: 'Role must be a string' })
  role!: string

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email' })
  email!: string
}
