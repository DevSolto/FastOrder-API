import { Request, Response } from 'express';
import validator from 'validator';
import { GetUnityByIdUseCase } from '../../use cases/unities/getUnityById';

export class GetUnityByIdController {
  async execute(httpRequest: Request, httpResponse: Response) {
    try {
      const unityId = httpRequest.params.unityId

      const isUUID = validator.isUUID(unityId)
      if(!isUUID){
        return httpResponse.status(400).json({
          message:"Id Invalido"
        })
      }

      const getUnityByIdUseCase = new GetUnityByIdUseCase()

      const unity = await getUnityByIdUseCase.execute(unityId)

      return httpResponse.status(200).json({
        message: unity
      });
    } catch (error) {
      console.log(error)
      return httpResponse.status(500).json({
        error: error
      });
    }
  }
}