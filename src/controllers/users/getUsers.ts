import { Response } from 'express';
import { GetUsersUseCase } from '../../use cases/users/getUsers';


export class GetUsersController{
  async execute(httpResponse: Response){
    try {
      const getUsersUseCase = new GetUsersUseCase()
      const users = await getUsersUseCase.execute()
      return httpResponse.status(200).json({
        message: users
      });
    } catch (error) {
      console.log(error)
      return httpResponse.status(400).json({
        error: error
      });
    }
  }
}