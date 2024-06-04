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
            message: "Order details"
        }

        const isUuid = validator.isUUID(orderId) 

        if (!isUuid) {
            httpResponse.status - 400
            httpResponse.success = false
            httpResponse.message = `The id ${orderId} is not valid.`
            
            return res.status(httpResponse.status).json(httpResponse)
        }

        try {
            const order = await this.orderUseCase.getById(orderId)

            if(!order) {
                httpResponse.status = 404
                httpResponse.success = false
                httpResponse.message =  'order Not Found'

                return res.status(httpResponse.status).json(httpResponse)
            }    

            httpResponse.data = order
           return res.status(httpResponse.status).json(httpResponse)

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
            message: "Order list"
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
            message: "Successfully created order"
        }

        if(!request_body_validation.success){
            httpResponse.status = 400
            httpResponse.success = false
            httpResponse.message = "Unable to create order, please check the values"
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
            message: "Successfully order update"
        }

        const isUuid = validator.isUUID(orderId) 
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
            httpResponse.message = "Unable to update order, please check the values"
            httpResponse.errors = request_body_validation.error.formErrors.fieldErrors
            
            return res.status(httpResponse.status).json(httpResponse)
        }
        try {
            const orderExist = await this.orderUseCase.getById(orderId)

            if(!orderExist) { 
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

            if(!orderExist) { 
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