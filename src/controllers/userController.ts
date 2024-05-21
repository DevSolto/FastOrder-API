import { Request, Response } from 'express';
import { UserUseCase } from '../useCases/userUseCase';
import { IsEmail, IsNotEmpty, IsString, validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

// Controlador que lida com as requisições HTTP relacionadas a usuários
export class UserController {
  userUseCase = new UserUseCase(); // Instância da classe de casos de uso de usuários

  // Método para buscar um usuário por ID
  // Parâmetro: req - objeto de requisição do Express
  // Parâmetro: res - objeto de resposta do Express
  // Retorna: void (resposta HTTP enviada diretamente)
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id; // Obtém o ID do usuário dos parâmetros da URL
      const user = await this.userUseCase.getById(userId); // Busca o usuário pelo ID
      if (user) {
        res.status(200).json(user); // Retorna o usuário encontrado com status 200
      } else {
        res.status(404).json({ message: 'User not found' }); // Retorna erro 404 se o usuário não for encontrado
      }
    } catch (error) {
      console.error('Error fetching user by ID:', error); // Log de erro no servidor
      res.status(500).json({ message: 'Internal server error' }); // Retorna erro 500 em caso de falha interna
    }
  }

  // Método para criar um novo usuário
  // Parâmetro: req - objeto de requisição do Express
  // Parâmetro: res - objeto de resposta do Express
  // Retorna: void (resposta HTTP enviada diretamente)
  async create(req: Request, res: Response): Promise<void> {
    try {
      const createUserDto = plainToClass(CreateUserDTO, req.body); // Converte o corpo da requisição para a classe DTO
      const errors = await validate(createUserDto); // Valida os dados do DTO

      if (errors.length > 0) {
        res.status(400).json({ errors: errors.map(error => error.constraints) }); // Retorna erros de validação com status 400
        return;
      }

      const user = await this.userUseCase.create(createUserDto); // Cria o usuário usando a classe de casos de uso
      res.status(201).json(user); // Retorna o usuário criado com status 201
    } catch (error) {
      console.error('Error creating user:', error); // Log de erro no servidor
      res.status(500).json({ message: 'Internal server error' }); // Retorna erro 500 em caso de falha interna
    }
  }
}

// Classe DTO para validação e transformação de dados de criação de usuário
class CreateUserDTO {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name!: string;

  @IsNotEmpty({ message: 'Cpf is required' })
  @IsString({ message: 'Cpf must be a string' })
  cpf!: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  password!: string;

  @IsNotEmpty({ message: 'Phone is required' })
  @IsString({ message: 'Phone must be a string' })
  phone!: string;

  @IsNotEmpty({ message: 'Role is required' })
  @IsString({ message: 'Role must be a string' })
  role!: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email' })
  email!: string;
}
