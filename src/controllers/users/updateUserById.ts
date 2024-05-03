import { Request, Response } from 'express';
import validator from "validator"
import { cpf as cpfValidator } from 'cpf-cnpj-validator'; 
import { UpdateUserByIdUseCase } from '../../use cases/users/updateUserById';

export class UpdateUserByIdController {
  async execute(httpRequest: Request, httpResponse: Response) {
    try {   
      const userId = httpRequest.params.userId
      const updateUserPrams = httpRequest.body;
  
      if(updateUserPrams.cpf){
        const isCpfValid = cpfValidator.isValid(updateUserPrams.cpf)
        if(!isCpfValid){
          return httpResponse.status(400).json({
            message:'Cpf Invalido'
          })
        }
      }
      if(updateUserPrams.email){
        const isEmailValid = validator.isEmail(updateUserPrams.email)
        if(!isEmailValid){
          return httpResponse.status(400).json({
            message:'Email Invalido'
          })
        }
      }
      if(updateUserPrams.password){
        const isPasswordStrong = validator.isStrongPassword(updateUserPrams.password)
        if(!isPasswordStrong){
          return httpResponse.status(400).json({
            message:'Senha muito fraca'
          })
        }
      }

  
      const updateUserByIdUseCase = new UpdateUserByIdUseCase()
      const userCreated = await updateUserByIdUseCase.execute(userId, updateUserPrams)
  
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
