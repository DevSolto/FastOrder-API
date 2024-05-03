import { Request, Response } from 'express';
import validator from "validator"
import { CreateUserUseCase } from '../../use cases/users/createUser';
import { cpf as cpfValidator } from 'cpf-cnpj-validator'; 

export class CreateUserController {
  async execute(httpRequest: Request, httpResponse: Response) {
    try {   
      const { name,cpf, email, password } = httpRequest.body;
      const requiredFields = ["name","cpf", "email", "password"];
  
      for (const field of requiredFields) {
        if (!httpRequest.body[field] || httpRequest.body[field].trim().length === 0) {
          return httpResponse.status(400).json({
            message: `Parâmetro ausente: ${field}`
          });
        }
      }
  
      const isCpfValid = cpfValidator.isValid(cpf)
      if(!isCpfValid){
        return httpResponse.status(400).json({
          message:'Cpf Invalido'
        })
      }

      const isEmailValid = validator.isEmail(email)
      if(!isEmailValid){
        return httpResponse.status(400).json({
          message:'Email Invalido'
        })
      }
      const isPasswordStrong = validator.isStrongPassword(password)
      if(!isPasswordStrong){
        return httpResponse.status(400).json({
          message:'Senha muito fraca'
        })
      }
  
      const createUserUseCase = new CreateUserUseCase()
      const userCreated = await createUserUseCase.execute({
        cpf,
        nome:name,
        email,
        senha:password
      })
  
      return httpResponse.status(201).json({
        message: userCreated
      });
    } catch (error) {
      console.log(error)
      return httpResponse.status(500).json({
        error: error
      });
    }
  }
}
