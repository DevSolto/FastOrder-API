import { Request, Response } from 'express';
import { UserUseCase } from '../useCases/userUseCase';
import validator from 'validator';

import { RequestHttpResponse } from '../types';
import {z} from "zod"
import { createUserSchema, updateUserSchema } from '../schemas/userSchemas';


// Controlador que lida com as requisições HTTP relacionadas a usuários
export class UserController {
  userUseCase = new UserUseCase(); // Instância da classe de casos de uso de usuários

    async getById(req: Request, res: Response) {
        const {userId} = req.params; // Obtém o ID do usuário dos parâmetros da URL
        
        const httpResponse: RequestHttpResponse = {
          status: 200,
          success: true,
          message: "User Details"
      }

        const isUuid = validator.isUUID(userId)


        if (!isUuid) {
          httpResponse.status - 400
          httpResponse.success = false
          httpResponse.message = `The id ${userId} is not valid.`
          
          return res.status(httpResponse.status).json(httpResponse)

        }
        
      try {
        const user = await this.userUseCase.getById(userId); // Busca o usuário pelo ID

        if(!user) {
          httpResponse.status = 404
          httpResponse.success = false
          httpResponse.message =  'User Not Found'

          return res.status(httpResponse.status).json(httpResponse)
        }

        httpResponse.data = user

        return res.status(httpResponse.status).json(httpResponse)

      } catch (error) {
        console.error('Error fetching user by ID:', error); // Log de erro no servidor
        
        httpResponse.status = 500
        httpResponse.success = false
        httpResponse.message = 'Internal server error'
        
      return  res.status(httpResponse.status).json(httpResponse); 
      }

    }

    async getAll(res: Response) {
      const httpResponse: RequestHttpResponse = {
          status: 200,
          success: true,
          message: "Lista de Usuarios"

      }

      /* Adicionar FIltro, Ordenação e Paginação */


      try {
          const users = await this.userUseCase.getAll()

          httpResponse.data = users
          
          return res.status(httpResponse.status).json(httpResponse)


      } catch (error) {
          console.error('Error fetching all product by ID:', error);
          
          httpResponse.status = 500
          httpResponse.success = false
          httpResponse.message = 'Internal server error'
          
        return  res.status(httpResponse.status).json(httpResponse); 
      }
    }


    async create(req: Request, res: Response) {
        const request_body_validation = await createUserSchema.safeParseAsync(req.body)

        const httpResponse: RequestHttpResponse = {
            status: 200,
            success: true,
            message: "User Created Succefully"
        }

        if(!request_body_validation.success){
            httpResponse.status = 400
            httpResponse.success = false
            httpResponse.message = "Unable to create user, please check the values"
            httpResponse.errors = request_body_validation.error.formErrors.fieldErrors
            
            return res.status(httpResponse.status).json(httpResponse)
        }

        try {
            await this.userUseCase.create(request_body_validation.data)

            res.status(201).json(httpResponse)
        } catch (error) {
            console.error('Error creating a user:', error);
            
            httpResponse.status = 500
            httpResponse.success = false
            httpResponse.message = 'Internal server error'
            
            return  res.status(httpResponse.status).json(httpResponse); 
        }
    }

    async update(req: Request, res: Response) {
        const {userId} = req.params; // Obtém o ID do usuário dos parâmetros da URL
          
        const httpResponse: RequestHttpResponse = {
            status: 200,
            success: true,
            message: "User Updated Succefully"
        }

          const isUuid = validator.isUUID(userId)

          if (!isUuid) {
            httpResponse.status - 400
            httpResponse.success = false
            httpResponse.message = `The id ${userId} is not valid.`
            
            return res.status(httpResponse.status).json(httpResponse)
          }

        const request_body_validation = await updateUserSchema.safeParseAsync(req.body)

        if(!request_body_validation.success){
            httpResponse.status = 400
            httpResponse.success = false
            httpResponse.message = "Unable to update user, check field values"
            httpResponse.errors = request_body_validation.error.formErrors.fieldErrors
            
            return res.status(httpResponse.status).json(httpResponse)
        }
        try {
            const userExist = await this.userUseCase.getById(userId)

            if(!userExist) {
                httpResponse.status = 404
                httpResponse.success = false
                httpResponse.message =  'User Not Found'

                return res.status(httpResponse.status).json(httpResponse)
            }    
            
            const product = await this.userUseCase.update(userId, request_body_validation.data)
            
            
            return res.status(httpResponse.status).json(httpResponse)
        } catch (error) {
            console.error('Error updating a user:', error);
            
            httpResponse.status = 500
            httpResponse.success = false
            httpResponse.message = 'Internal server error'
            
           return  res.status(httpResponse.status).json(httpResponse); 
        }
    }

    async delete(req: Request, res: Response) {
      const {userId} = req.params
          
          const httpResponse: RequestHttpResponse = {
              status: 200,
              success: true,
              message: 'User Deleted Succefully'
          }

          const isUuid = validator.isUUID(userId) 

          if (!isUuid) {
              httpResponse.status = 400
              httpResponse.success = false
              httpResponse.message = `The id ${userId} is not valid.`
              
              return res.status(httpResponse.status).json(httpResponse)
          }

          try {
              const userExist = await this.userUseCase.getById(userId)

              if(!userExist) { 
                  httpResponse.status = 404
                  httpResponse.success = false
                  httpResponse.message =  'User Not Found'

                  return res.status(httpResponse.status).json(httpResponse)
              }    
              
              await this.userUseCase.delete(userId)


              return res.status(httpResponse.status).json(httpResponse)
          } catch (error) {
              console.error('Error deleting a product:', error);
              
              httpResponse.status = 500
              httpResponse.success = false
              httpResponse.message = 'Internal server error'
              
            return  res.status(httpResponse.status).json(httpResponse); 
          }
    }
}
