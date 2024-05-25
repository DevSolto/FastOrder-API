import { WorkUseCase } from "../useCases/workUseCase"
import { Request, Response } from "express"
import { RequestHttpResponse } from "../types"
import { createWorkSchema,updateWorkSchema } from "../schemas/workSchemas"
import {z} from 'zod'

export class WorkController {
    workUseCase = new WorkUseCase()

    async getAllWorks(req: Request, res: Response) {
        const httpResponse: RequestHttpResponse = {
            status: 200,
            success: true,
            message: "Lista de Trabalhadores"
        }

        try {
            const works = await this.workUseCase.getAllWorks()

            httpResponse.data = works

            return res.status(httpResponse.status).json(httpResponse)
        } catch (error) {
            console.error('Error fetching all works', error);
            
            httpResponse.status = 500
            httpResponse.success = false
            httpResponse.message = 'Internal server error'
            
           return  res.status(httpResponse.status).json(httpResponse); 
        }
    }

    async create(req: Request, res: Response) {
        const request_body_validation = await createWorkSchema.safeParseAsync(req.body)

        const httpResponse: RequestHttpResponse = {
            status: 200,
            success: true,
            message: "Trabalhador Registrado com Sucesso"
        }

        if(!request_body_validation.success){
            httpResponse.status = 400
            httpResponse.success = false
            httpResponse.message = "Não foi possivel registrar o trabalhador, verifique os valores dos campos"
            httpResponse.errors = request_body_validation.error.formErrors.fieldErrors
            
            return res.status(httpResponse.status).json(httpResponse)
        }

        try {
            const work = await this.workUseCase.create(request_body_validation.data)

            res.status(201).json(work)
        } catch (error) {
            console.error('Error registring a work:', error);
            
            httpResponse.status = 500
            httpResponse.success = false
            httpResponse.message = 'Internal server error'
            
           return  res.status(httpResponse.status).json(httpResponse); 
        }

    }

    async getById(req: Request, res: Response) {
        const {userId, unitId} = req.params

        const httpResponse: RequestHttpResponse = {
            status: 200,
            success: true,
            message: "Lista de Trabalhadores"
        }

        const isUuid = await  z.object({
            userId: z.string().uuid(),
            unitId: z.string().uuid(),
        }).safeParseAsync({userId, unitId})

        if(!isUuid.success){
            httpResponse.status - 400
            httpResponse.success = false
            httpResponse.message = `The id is not valid.`
            httpResponse.errors = isUuid.error.flatten().fieldErrors
            
            return res.status(httpResponse.status).json(httpResponse)
        }

        const userIdValidated = isUuid.data.userId
        const unitIdValidated = isUuid.data.unitId

        try {
            const work = await this.workUseCase.getById(userIdValidated, unitIdValidated, {
                include: {
                    Unit: true,
                    User: true
                }
            })

            if(!work) {
                httpResponse.status = 404
                httpResponse.success = false
                httpResponse.message =  'Worker Not Found'

                return res.status(httpResponse.status).json(httpResponse)
            }

            httpResponse.data = work
            
            return res.status(httpResponse.status).json(httpResponse)
        } catch (error) {
            console.error('Error fetching worker by ID:', error);

            httpResponse.status = 500
            httpResponse.success = false
            httpResponse.message = 'Internal server error'
            
           return  res.status(httpResponse.status).json(httpResponse); 
        }
    }

    async updateById(req: Request, res: Response) {
        const {userId, unitId} = req.params

        const httpResponse: RequestHttpResponse = {
            status: 200,
            success: true,
            message: "Registro do Trabalhador Atualizado com Sucesso"
        }

        const isUuid = await  z.object({
            userId: z.string().uuid(),
            unitId: z.string().uuid(),
        }).safeParseAsync({userId, unitId})

        if(!isUuid.success){
            httpResponse.status - 400
            httpResponse.success = false
            httpResponse.message = `The id is not valid.`
            httpResponse.errors = isUuid.error.flatten().fieldErrors
            
            return res.status(httpResponse.status).json(httpResponse)
        }

        const request_body_validation = await updateWorkSchema.safeParseAsync(req.body)
        
        if(!request_body_validation.success){
            httpResponse.status = 400
            httpResponse.success = false
            httpResponse.message = "Não foi possivel atualizar o trabalhador, verifique os valores dos campos"
            httpResponse.errors = request_body_validation.error.formErrors.fieldErrors
            
            return res.status(httpResponse.status).json(httpResponse)
        }

        const userIdValidated = isUuid.data.userId
        const unitIdValidated = isUuid.data.unitId 

        try {
            const workExist = await this.workUseCase.getById(userIdValidated,unitIdValidated)

            if(!workExist) { // verificação necessaria ??? PooductUseCase lança um Erro se N encontrar um produto - VERIFICA
                httpResponse.status = 404
                httpResponse.success = false
                httpResponse.message =  'work Not Found'

                return res.status(httpResponse.status).json(httpResponse)
            }    

            
            const work = await this.workUseCase.updateById(userIdValidated, unitIdValidated,request_body_validation.data)
            
            
            return res.status(httpResponse.status).json(httpResponse)
        } catch (error) {
            console.error('Error updating worker', error);

            httpResponse.status = 500
            httpResponse.success = false
            httpResponse.message = 'Internal server error'
            
           return  res.status(httpResponse.status).json(httpResponse); 
        }
    }

    async deleteById(req: Request, res: Response) {
        const {userId, unitId} = req.params

        const httpResponse: RequestHttpResponse = {
            status: 200,
            success: true,
            message: "Registro do Trabalhador Apagado com Sucesso"
        }

        const isUuid = await z.object({
            userId: z.string().uuid(),
            unitId: z.string().uuid(),
        }).safeParseAsync({userId, unitId})

        if(!isUuid.success){
            httpResponse.status - 400
            httpResponse.success = false
            httpResponse.message = `The id is not valid.`
            httpResponse.errors = isUuid.error.flatten().fieldErrors
            
            return res.status(httpResponse.status).json(httpResponse)
        }

        try {
            const workExist = await this.workUseCase.getById(userId, unitId)

            if(!workExist) { // verificação necessaria ??? PooductUseCase lança um Erro se N encontrar um produto - VERIFICA
                httpResponse.status = 404
                httpResponse.success = false
                httpResponse.message =  'Work Not Found'

                return res.status(httpResponse.status).json(httpResponse)
            }    
            
            const work = await this.workUseCase.deleteById(userId, unitId)


            return res.status(httpResponse.status).json(httpResponse)
        } catch (error) {
            console.error('Error updating worker', error);

            httpResponse.status = 500
            httpResponse.success = false
            httpResponse.message = 'Internal server error'
            
           return  res.status(httpResponse.status).json(httpResponse); 
        }
    }
}