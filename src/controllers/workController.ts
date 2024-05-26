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
            message: "Workers list"
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
            status: 201,
            success: true,
            message: "Successfully registred worker"
        }

        if(!request_body_validation.success){
            httpResponse.status = 400
            httpResponse.success = false
            httpResponse.message = "Unable to regiter worker, please check the values"
            httpResponse.errors = request_body_validation.error.formErrors.fieldErrors
            
            return res.status(httpResponse.status).json(httpResponse)
        }

        try {
            const work = await this.workUseCase.create(request_body_validation.data)

            res.status(httpResponse.status).json(httpResponse)
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
            message: "Workers list"
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
            const work = await this.workUseCase.getById(userIdValidated, unitIdValidated)

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
            message: "Successfully worker update"
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
            httpResponse.message = "Unable to update worker, please check the values"
            httpResponse.errors = request_body_validation.error.formErrors.fieldErrors
            
            return res.status(httpResponse.status).json(httpResponse)
        }

        const userIdValidated = isUuid.data.userId
        const unitIdValidated = isUuid.data.unitId 

        try {
            const workExist = await this.workUseCase.getById(userIdValidated,unitIdValidated)

            if(!workExist) {//VERIFICA
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
            message: "Successfully worker deleted"
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

            if(!workExist) { 
                httpResponse.status = 404
                httpResponse.success = false
                httpResponse.message =  'Work Not Found'

                return res.status(httpResponse.status).json(httpResponse)
            }    
            
            const work = await this.workUseCase.deleteById(userId, unitId)


            return res.status(httpResponse.status).json(httpResponse)
        } catch (error) {
            console.error('Error deleting worker', error);

            httpResponse.status = 500
            httpResponse.success = false
            httpResponse.message = 'Internal server error'
            
           return  res.status(httpResponse.status).json(httpResponse); 
        }
    }

    async getWorksByUserId(req: Request, res: Response){
        const {userId} = req.params

        const httpResponse: RequestHttpResponse = {
            status: 200,
            success: true,
            message: "Workers List From the User"
        }

        const isUuid = await z.string().uuid().safeParseAsync(userId)

        if(!isUuid.success){
            httpResponse.status - 400
            httpResponse.success = false
            httpResponse.message = `The user id is not valid.`
            httpResponse.errors = isUuid.error.flatten().fieldErrors
            
            return res.status(httpResponse.status).json(httpResponse)
        }

        try {
            const user_works = await this.workUseCase.getWorksByUserId(isUuid.data)

            httpResponse.data = user_works

            return res.status(httpResponse.status).json(httpResponse); 
            
        } catch (error) {
            console.error("Error get user's workers", error);

            httpResponse.status = 500
            httpResponse.success = false
            httpResponse.message = 'Internal server error'
            
           return  res.status(httpResponse.status).json(httpResponse); 
        }

    }
}