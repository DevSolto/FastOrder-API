import { OrdersUnitiesUseCase } from "../useCases/orderUnitiesUseCase"
import { Request, Response } from "express"
import { RequestHttpResponse } from "../types"
import { createOrderUnitiesSchema, updateOrderUnitiesSchema } from "../schemas/orderUnitiesSchema"
import { z } from 'zod'


export class OrdersUnitiesController {
    ordersUnitiesUseCase = new OrdersUnitiesUseCase()

    async getAllOrdersUnities(req: Request, res: Response) {
        const httpResponse: RequestHttpResponse = {
            status: 200,
            success: true,
            message: "workers list"
        }

        try {
            const works = await this.ordersUnitiesUseCase.getAllOrdersUnities()

            httpResponse.data = works

            return res.status(httpResponse.status).json(httpResponse)
        } catch (error) {
            console.error('Error fetching all order unities', error);
            
            httpResponse.status = 500
            httpResponse.success = false
            httpResponse.message = 'Internal server error'
            
           return  res.status(httpResponse.status).json(httpResponse); 
        }
    }

    async getById(req: Request, res: Response) {
        const {orderId, unitId} = req.params

        const httpResponse: RequestHttpResponse = {
            status: 200,
            success: true,
            message: "ordering details for that unit"
        }

        const isUuid = await  z.object({
            orderId: z.string().uuid(),
            unitId: z.string().uuid(),
        }).safeParseAsync({orderId, unitId})

        if(!isUuid.success){
            httpResponse.status - 400
            httpResponse.success = false
            httpResponse.message = `The id is not valid.`
            httpResponse.errors = isUuid.error.flatten().fieldErrors
            
            return res.status(httpResponse.status).json(httpResponse)
        }

        const orderIdValidated = isUuid.data.orderId
        const unitIdValidated = isUuid.data.unitId

        try {
            const work = await this.ordersUnitiesUseCase.getById(orderIdValidated, unitIdValidated)

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
    
    async getOrderUnitiesByOrderId(req: Request, res: Response) {
        const {orderId} = req.params

        const httpResponse: RequestHttpResponse = {
            status: 200,
            success: true,
            message: "Lista de pedidos da unidade"
        }

        const isUuid = await z.string().uuid().safeParseAsync(orderId)

        if(!isUuid.success){
            httpResponse.status - 400
            httpResponse.success = false
            httpResponse.message = `The user id is not valid.`
            httpResponse.errors = isUuid.error.flatten().fieldErrors
            
            return res.status(httpResponse.status).json(httpResponse)
        }

        try {
            const order_unities = await this.ordersUnitiesUseCase.getOrdersUnitiesByOrderId(isUuid.data)

            httpResponse.data = order_unities

            return res.status(httpResponse.status).json(httpResponse); 
            
        } catch (error) {
            console.error("Error get user's workers", error);

            httpResponse.status = 500
            httpResponse.success = false
            httpResponse.message = 'Internal server error'
            
           return  res.status(httpResponse.status).json(httpResponse); 
        }
    }

    async getOrderUnitiesByUnityId(req: Request, res: Response) {}
    
    async create(req: Request, res: Response) {
        const request_body_validation = await createOrderUnitiesSchema.safeParseAsync(req.body)

        const httpResponse: RequestHttpResponse = {
            status: 201,
            success: true,
            message: "Registrado com Sucesso"
        }

        if(!request_body_validation.success){
            httpResponse.status = 400
            httpResponse.success = false
            httpResponse.message = "Não foi possível registrar"
            httpResponse.errors = request_body_validation.error.formErrors.fieldErrors
            
            return res.status(httpResponse.status).json(httpResponse)
        }

        try {
            const orderUnity = await this.ordersUnitiesUseCase.create(request_body_validation.data)

            res.status(httpResponse.status).json(httpResponse)
        } catch (error) {
            console.error('Error registring a work:', error);
            
            httpResponse.status = 500
            httpResponse.success = false
            httpResponse.message = 'Internal server error'
            
           return  res.status(httpResponse.status).json(httpResponse); 
        }
    }
    
    async deleteById(req: Request, res: Response) {
        const {orderId, unitId} = req.params

        const httpResponse: RequestHttpResponse = {
            status: 200,
            success: true,
            message: "Registro do Trabalhador Apagado com Sucesso"
        }

        const isUuid = await z.object({
            orderId: z.string().uuid(),
            unitId: z.string().uuid(),
        }).safeParseAsync({orderId, unitId})

        if(!isUuid.success){
            httpResponse.status - 400
            httpResponse.success = false
            httpResponse.message = `The id is not valid.`
            httpResponse.errors = isUuid.error.flatten().fieldErrors
            
            return res.status(httpResponse.status).json(httpResponse)
        }

        try {
            const orderUnityExist = await this.ordersUnitiesUseCase.getById(orderId, unitId)

            if(!orderUnityExist) { // verificação necessaria ??? PooductUseCase lança um Erro se N encontrar um produto - VERIFICA
                httpResponse.status = 404
                httpResponse.success = false
                httpResponse.message =  'Work Not Found'

                return res.status(httpResponse.status).json(httpResponse)
            }    
            
            await this.ordersUnitiesUseCase.deleteById(orderId, unitId)

            return res.status(httpResponse.status).json(httpResponse)
        } catch (error) {
            console.error('Error updating worker', error);

            httpResponse.status = 500
            httpResponse.success = false
            httpResponse.message = 'Internal server error'
            
           return  res.status(httpResponse.status).json(httpResponse); 
        }
    }

    async updateById(req: Request, res: Response) {
        const {orderId, unitId} = req.params

        const httpResponse: RequestHttpResponse = {
            status: 200,
            success: true,
            message: "Registro do Trabalhador Atualizado com Sucesso"
        }

        const isUuid = await  z.object({
            orderId: z.string().uuid(),
            unitId: z.string().uuid(),
        }).safeParseAsync({orderId, unitId})

        if(!isUuid.success){
            httpResponse.status - 400
            httpResponse.success = false
            httpResponse.message = `The id is not valid.`
            httpResponse.errors = isUuid.error.flatten().fieldErrors
            
            return res.status(httpResponse.status).json(httpResponse)
        }

        const request_body_validation = await updateOrderUnitiesSchema.safeParseAsync(req.body)
        
        if(!request_body_validation.success){
            httpResponse.status = 400
            httpResponse.success = false
            httpResponse.message = "Não foi possivel atualizar o trabalhador, verifique os valores dos campos"
            httpResponse.errors = request_body_validation.error.formErrors.fieldErrors
            
            return res.status(httpResponse.status).json(httpResponse)
        }

        const orderIdValidated = isUuid.data.orderId
        const unitIdValidated = isUuid.data.unitId 

        try {
            const orderUnityExist = await this.ordersUnitiesUseCase.getById(orderIdValidated, unitIdValidated)

            if(!orderUnityExist) { // verificação necessaria ??? PooductUseCase lança um Erro se N encontrar um produto - VERIFICA
                httpResponse.status = 404
                httpResponse.success = false
                httpResponse.message =  'work Not Found'

                return res.status(httpResponse.status).json(httpResponse)
            }    

            
            await this.ordersUnitiesUseCase.updateById(orderIdValidated, unitIdValidated,request_body_validation.data)
            
            
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