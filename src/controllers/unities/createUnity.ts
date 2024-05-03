import { Request, Response } from 'express';
import validator from 'validator';
import { GetUnityByIdUseCase } from '../../use cases/unities/getUnityById';
import { CreateUnityUseCase } from '../../use cases/unities/createUnity';

export class CreateUnityController {
  async execute(httpRequest: Request, httpResponse: Response) {
    try {
      const { name, descricao, tipo } = httpRequest.body;
      const requiredFields = ["name","descricao", "tipo"];
  
      for (const field of requiredFields) {
        if (!httpRequest.body[field] || httpRequest.body[field].trim().length === 0) {
          return httpResponse.status(400).json({
            message: `Parâmetro ausente: ${field}`
          });
        }
      }

      const createUnityUseCase = new CreateUnityUseCase()
      const unity = await createUnityUseCase.execute({
        nome:name,
        descricao,
        tipo
      })
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