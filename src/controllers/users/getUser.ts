import { Request, Response } from 'express';
import validator from 'validator';
import { GetUserByEmailUseCase } from '../../use cases/users/getUserByEmail';
import { cpf } from 'cpf-cnpj-validator'; 
import { GetUserByCpfUseCase } from '../../use cases/users/getUserByCpf';
import { GetUserByIdUseCase } from '../../use cases/users/getUserById';

export class GetUserController{
  async execute(httpRequest: Request, httpResponse: Response){
    try {
      const param = httpRequest.params.param
    let user
    const isEmail = validator.isEmail(param)
    if(isEmail){
      const getUserByEmailUseCase = new GetUserByEmailUseCase()
      user = await getUserByEmailUseCase.execute(param)      
    }else{
      const isCpf = cpf.isValid(param)
      if(isCpf){
        const getUserByCpfUseCase = new GetUserByCpfUseCase()
        user = await getUserByCpfUseCase.execute(param)
      }else{
        const isUuid = validator.isUUID(param)
        if(isUuid){
          const getUserByIdUseCase = new GetUserByIdUseCase()
          user = await getUserByIdUseCase.execute(param)
        }else{
          return httpResponse.status(400).json({
            message: "O parâmetro invalido"
          });
        }
      }
    }

    return httpResponse.status(200).json({
      message: user
    });
    } catch (error) {
      console.log(error)
      return httpResponse.status(400).json({
        error: error
      });
    }
  }
}