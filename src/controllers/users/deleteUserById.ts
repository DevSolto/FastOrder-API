import { Request, Response } from 'express';
import validator from 'validator';
import { GetUserByEmailUseCase } from '../../use cases/users/getUserByEmail';
import { cpf } from 'cpf-cnpj-validator';
import { GetUserByCpfUseCase } from '../../use cases/users/getUserByCpf';
import { GetUserByIdUseCase } from '../../use cases/users/getUserById';
import { DeleteUserByIdUseCase } from '../../use cases/users/deleteUserById';

export class DeleteUserByIdController {
  async execute(httpRequest: Request, httpResponse: Response) {
    try {
      const userId = httpRequest.params.userId
      const isUUID = validator.isUUID(userId)
      if(!isUUID){
        return httpResponse.status(400).json({
          message:"Id invalido"
        })
      }
      const deleteUserById = new DeleteUserByIdUseCase()
      const user = await deleteUserById.execute(userId)

      return httpResponse.status(200).json({
        message: user
      });
    } catch (error) {
      console.log(error)
      return httpResponse.status(500).json({
        error: error
      });
    }
  }
}