import { Request, Response } from 'express';
import { UserUseCase } from '../useCases/userUseCase';
import { IsEmail, IsNotEmpty, IsString, validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

export class UserController {
  userUseCase = new UserUseCase();

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      const user = await this.userUseCase.getById(userId);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const createUserDto = plainToClass(CreateUserDTO, req.body);
      const errors = await validate(createUserDto);

      if (errors.length > 0) {
        res.status(400).json({ errors: errors.map(error => error.constraints) });
        return 
      }

      const user = await this.userUseCase.create(createUserDto);
      res.status(201).json(user);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

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
