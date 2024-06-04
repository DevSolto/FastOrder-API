import { OrderItemsUseCase } from "../useCases/orderItemsUseCase" 
import { Request, Response } from "express"
import { RequestHttpResponse } from "../types"
import { createOrderItemSchema, updateOrderItemSchema } from "../schemas/orderItemsSchema"
import {z} from 'zod'

export class OrderItemsController {
    orderItemUseCase = new OrderItemsUseCase()

    async getById(req: Request, res: Response) {
        const {orderId, productId} = req.params

        const httpResponse: RequestHttpResponse = {
            status: 200,
            success: true,
            message: "Workers list"
        }

        const isUuid = await  z.object({
            orderId: z.string().uuid(),
            productId: z.string().uuid(),
        }).safeParseAsync({orderId, productId})

        if(!isUuid.success){
            httpResponse.status - 400
            httpResponse.success = false
            httpResponse.message = `The id is not valid.`
            httpResponse.errors = isUuid.error.flatten().fieldErrors
            
            return res.status(httpResponse.status).json(httpResponse)
        }

        const orderIdValidated = isUuid.data.orderId
        const productIdValidated = isUuid.data.productId

        try {
            const order_items = await this.orderItemUseCase.getById(orderIdValidated, productIdValidated)

            if(!order_items) {
                httpResponse.status = 404
                httpResponse.success = false
                httpResponse.message =  'Order Not Found'

                return res.status(httpResponse.status).json(httpResponse)
            }

            httpResponse.data = order_items
            
            return res.status(httpResponse.status).json(httpResponse)
        } catch (error) {
            console.error('Error fetching Order by ID:', error);

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
            const orders_items = await this.orderItemUseCase.getAll()

            httpResponse.data = orders_items

            return res.status(httpResponse.status).json(httpResponse)

        } catch (error) {
            console.error('Error fetching order items by ID:', error);

            httpResponse.status = 500
            httpResponse.success = false
            httpResponse.message = 'Internal server error'
            
           return  res.status(httpResponse.status).json(httpResponse); 
        }
    }

    async create(req: Request, res: Response) {
        const request_body_validation = await createOrderItemSchema.safeParseAsync(req.body)

        const httpResponse: RequestHttpResponse = {
            status: 201,
            success: true,
            message: "Product added to order successfully"
        }

        if(!request_body_validation.success){
            httpResponse.status = 400
            httpResponse.success = false
            httpResponse.message = "Unable to create product upon request"
            httpResponse.errors = request_body_validation.error.formErrors.fieldErrors
            
            return res.status(httpResponse.status).json(httpResponse)
        }

        try {
            const order_items = await this.orderItemUseCase.create(request_body_validation.data)

            res.status(httpResponse.status).json(httpResponse)
        } catch (error) {
            console.error('Error creating a order items:', error);
            
            httpResponse.status = 500
            httpResponse.success = false
            httpResponse.message = 'Internal server error'
            
           return  res.status(httpResponse.status).json(httpResponse); 
        }
    } 

    async updateById(req: Request, res: Response) {
        const {orderId, productId} = req.params

        const httpResponse: RequestHttpResponse = {
            status: 200,
            success: true,
            message: "Sucessfully order update"
        }

        const isUuid = await  z.object({
            orderId: z.string().uuid(),
            productId: z.string().uuid(),
        }).safeParseAsync({orderId, productId})

        if(!isUuid.success){
            httpResponse.status - 400
            httpResponse.success = false
            httpResponse.message = `The id is not valid.`
            httpResponse.errors = isUuid.error.flatten().fieldErrors
            
            return res.status(httpResponse.status).json(httpResponse)
        }

        const request_body_validation = await updateOrderItemSchema.safeParseAsync(req.body)
        
        if(!request_body_validation.success){
            httpResponse.status = 400
            httpResponse.success = false
            httpResponse.message = "Unable to update order, please check the values"
            httpResponse.errors = request_body_validation.error.formErrors.fieldErrors
            
            return res.status(httpResponse.status).json(httpResponse)
        }

        const orderIdValidated = isUuid.data.orderId
        const productIdValidated = isUuid.data.productId 

        try {
            const workExist = await this.orderItemUseCase.getById(orderIdValidated,productIdValidated)

            if(!workExist) {
                httpResponse.success = false
                httpResponse.message =  'work Not Found'

                return res.status(httpResponse.status).json(httpResponse)
            }    

            
            const work = await this.orderItemUseCase.updateById(orderIdValidated, productIdValidated,request_body_validation.data)
            
            
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
        const {orderId, productId} = req.params

        const httpResponse: RequestHttpResponse = {
            status: 200,
            success: true,
            message: " Successfully deleted item"
        }

        const isUuid = await  z.object({
            orderId: z.string().uuid(),
            productId: z.string().uuid(),
        }).safeParseAsync({orderId, productId})

        if(!isUuid.success){
            httpResponse.status - 400
            httpResponse.success = false
            httpResponse.message = `The id is not valid.`
            httpResponse.errors = isUuid.error.flatten().fieldErrors
            
            return res.status(httpResponse.status).json(httpResponse)
        }

        const orderIdValidated = isUuid.data.orderId
        const productIdValidated = isUuid.data.productId

        try {
            const workExist = await this.orderItemUseCase.getById(orderIdValidated, productIdValidated)

            if(!workExist) { 
                httpResponse.status = 404
                httpResponse.success = false
                httpResponse.message =  'Work Not Found'

                return res.status(httpResponse.status).json(httpResponse)
            }    
            
            const work = await this.orderItemUseCase.deleteById(orderIdValidated, productIdValidated)


            return res.status(httpResponse.status).json(httpResponse)
        } catch (error) {
            console.error('Error updating worker', error);

            console.log(error);

            httpResponse.status = 500
            httpResponse.success = false
            httpResponse.message = 'Internal server error'
            
           return  res.status(httpResponse.status).json(httpResponse); 
        }
    }

    async getItemsByOrderId(req: Request, res: Response){
        const {orderId} = req.params

        const httpResponse: RequestHttpResponse = {
            status: 200,
            success: true,
            message: "Workers list"
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
            const order_items = await this.orderItemUseCase.getItemsByOrderId(isUuid.data)

            httpResponse.data = order_items

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