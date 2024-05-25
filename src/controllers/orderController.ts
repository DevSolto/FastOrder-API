import {OrderUseCase} from "../useCases/orderUseCase"
import {Request, Response} from "express"
import {RequestHttpResponse} from "../types"
import validator from "validator"
import { createOrderSchema, updateOrderSchema } from "../schemas/orderSchemas"

export class OrderController {
    orderUseCase = new OrderUseCase()

    async getById(req: Request, res: Response) {
        const {orderId} = req.params

        const httpResponse: RequestHttpResponse = {
            status: 200,
            success: true,
            message: "Detalhes do Pedidos"
        }

        const isUuid = validator.isUUID(orderId) // Mudar Pro Zod????

        if (!isUuid) {
            httpResponse.status - 400
            httpResponse.success = false
            httpResponse.message = `The id ${orderId} is not valid.`
            
            return res.status(httpResponse.status).json(httpResponse)
        }

        try {
            const order = await this.orderUseCase.getById(orderId)

            if(!order) { // verificação necessaria ??? PooductUseCase lança um Erro se N encontrar um produto - VERIFICA
                httpResponse.status = 404
                httpResponse.success = false
                httpResponse.message =  'order Not Found'

                return res.status(httpResponse.status).json(httpResponse)
            }    

           return res.status(httpResponse.status).json(order)

        } catch (error) {
            console.error('Error fetching order by ID:', error);

            httpResponse.status = 500
            httpResponse.success = false
            httpResponse.message = 'Internal server error'
            
           return  res.status(httpResponse.status).json(httpResponse); 
        }
    }

    async getAll(req: Request, res: Response) {
        const httpResponse: RequestHttpResponse = {
            status: 200,
            success: true,
            message: "Lista de Pedidos"
        }

        try {
            const orders = await this.orderUseCase.getAll()

            httpResponse.data = orders

            return res.status(httpResponse.status).json(httpResponse)

        } catch (error) {
            console.error('Error fetching order by ID:', error);

            httpResponse.status = 500
            httpResponse.success = false
            httpResponse.message = 'Internal server error'
            
           return  res.status(httpResponse.status).json(httpResponse); 
        }
    }

    async create(req: Request, res: Response) {
        const request_body_validation = await createOrderSchema.safeParseAsync(req.body)

        const httpResponse: RequestHttpResponse = {
            status: 201,
            success: true,
            message: "Produto Criado com Sucesso"
        }

        if(!request_body_validation.success){
            httpResponse.status = 400
            httpResponse.success = false
            httpResponse.message = "Não foi possivel criar o pedido, verifique os valores dos campos"
            httpResponse.errors = request_body_validation.error.formErrors.fieldErrors
            
            return res.status(httpResponse.status).json(httpResponse)
        }

        try {
            const order = await this.orderUseCase.create(request_body_validation.data)

            res.status(httpResponse.status).json(httpResponse)
        } catch (error) {
            console.error('Error creating a order:', error);
            
            httpResponse.status = 500
            httpResponse.success = false
            httpResponse.message = 'Internal server error'
            
           return  res.status(httpResponse.status).json(httpResponse); 
        }
    }

    async updateById(req: Request, res: Response) {
        const {orderId} = req.params

        const httpResponse: RequestHttpResponse = {
            status: 200,
            success: true,
            message: "Produto Atualizado com Sucesso"
        }

        const isUuid = validator.isUUID(orderId) // Mudar Pro Zod????
        const request_body_validation = await updateOrderSchema.safeParseAsync(req.body)

        if (!isUuid) {
            httpResponse.status = 400
            httpResponse.success = false
            httpResponse.message = `The id ${orderId} is not valid.`
            
            return res.status(httpResponse.status).json(httpResponse)
        }

        if(!request_body_validation.success){
            httpResponse.status = 400
            httpResponse.success = false
            httpResponse.message = "Não foi possivel atualizar o produto, verifique os valores dos campos"
            httpResponse.errors = request_body_validation.error.formErrors.fieldErrors
            
            return res.status(httpResponse.status).json(httpResponse)
        }
        try {
            const orderExist = await this.orderUseCase.getById(orderId)

            if(!orderExist) { // verificação necessaria ??? PooductUseCase lança um Erro se N encontrar um produto - VERIFICA
                httpResponse.status = 404
                httpResponse.success = false
                httpResponse.message =  'Order Not Found'

                return res.status(httpResponse.status).json(httpResponse)
            }    
            
            const order = await this.orderUseCase.updateById(orderId, request_body_validation.data)
            
            
            return res.status(httpResponse.status).json(httpResponse)
        } catch (error) {
            console.error('Error updating a order:', error);
            
            httpResponse.status = 500
            httpResponse.success = false
            httpResponse.message = 'Internal server error'
            
           return  res.status(httpResponse.status).json(httpResponse); 
        }
    }

    async deleteById(req: Request, res: Response) {
        const {orderId} = req.params
        
        const httpResponse: RequestHttpResponse = {
            status: 200,
            success: true,
            message: 'order Deleted Succefully'
        }

        const isUuid = validator.isUUID(orderId) // Mudar Pro Zod????

        if (!isUuid) {
            httpResponse.status = 400
            httpResponse.success = false
            httpResponse.message = `The id ${orderId} is not valid.`
            
            return res.status(httpResponse.status).json(httpResponse)
        }

        try {
            const orderExist = await this.orderUseCase.getById(orderId)

            if(!orderExist) { // verificação necessaria ??? PooductUseCase lança um Erro se N encontrar um produto - VERIFICA
                httpResponse.status = 404
                httpResponse.success = false
                httpResponse.message =  'order Not Found'

                return res.status(httpResponse.status).json(httpResponse)
            }    
            
            const order = await this.orderUseCase.deleteById(orderId)


            return res.status(httpResponse.status).json(httpResponse)
        } catch (error) {
            console.error('Error deleting a order:', error);
            
            httpResponse.status = 500
            httpResponse.success = false
            httpResponse.message = 'Internal server error'
            
           return  res.status(httpResponse.status).json(httpResponse); 
        }
    }

}