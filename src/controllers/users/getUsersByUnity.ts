import { Request, Response } from 'express';
import validator from 'validator';
import { GetUsersByUnityUseCase } from '../../use cases/users/getUsersByUnity';
import { GetUnityByIdUseCase } from '../../use cases/unities/getUnityById';

export class GetUsersByUnityController {
  async execute(httpRequest: Request, httpResponse: Response) {
    try {

      const unityId = httpRequest.params.unityId

      const isUUID = validator.isUUID(unityId)
      if(!isUUID){
        return httpResponse.status(400).json({
          message:"Id invalido"
        })
      }
      const getUnityByIdUseCase = new GetUnityByIdUseCase()
      const isUnityExist = await getUnityByIdUseCase.execute(unityId)

      if(!isUnityExist){
        return httpResponse.status(400).json({
          message:"Unidade não existe"
        })
      }

      const getUsersByUnityUseCase = new GetUsersByUnityUseCase()
      const users = await getUsersByUnityUseCase.execute(unityId)

      return httpResponse.status(200).json({
        message: users
      });
    } catch (error) {
      console.log(error)
      return httpResponse.status(500).json({
        error: error
      });
    }
  }
}