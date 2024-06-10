import { OrderUseCase } from "../useCases/orderUseCase"
import { Request, Response } from "express"
import { RequestHttpResponse } from "../types"
import validator from "validator"
import { createOrderSchema, updateOrderSchema } from "../schemas/orderSchemas"
import { PrismaClient } from "@prisma/client"

export class OrderController {
    orderUseCase = new OrderUseCase()

    async getById(req: Request, res: Response) {
        const { orderId } = req.params

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

            if (!order) {
                httpResponse.status = 404
                httpResponse.success = false
                httpResponse.message = 'order Not Found'

                return res.status(httpResponse.status).json(httpResponse)
            }

            httpResponse.data = order
            return res.status(httpResponse.status).json(httpResponse)

        } catch (error) {
            console.error('Error fetching order by ID:', error);

            httpResponse.status = 500
            httpResponse.success = false
            httpResponse.message = 'Internal server error'

            return res.status(httpResponse.status).json(httpResponse);
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

            return res.status(httpResponse.status).json(httpResponse);
        }
    }

    async create(req: Request, res: Response) {
        const request_body_validation = await createOrderSchema.safeParseAsync(req.body)

        const httpResponse: RequestHttpResponse = {
            status: 201,
            success: true,
            message: "Successfully created order"
        }

        if (!request_body_validation.success) {
            httpResponse.status = 400
            httpResponse.success = false
            httpResponse.message = "Unable to create order, please check the values"
            httpResponse.errors = request_body_validation.error.formErrors.fieldErrors

            return res.status(httpResponse.status).json(httpResponse)
        }

        try {
            const order = await this.orderUseCase.create(request_body_validation.data)

            res.status(httpResponse.status).json({
                data:order,
                ...httpResponse
            })
        } catch (error) {
            console.error('Error creating a order:', error);

            httpResponse.status = 500
            httpResponse.success = false
            httpResponse.message = 'Internal server error'

            return res.status(httpResponse.status).json(httpResponse);
        }
    }

    async updateById(req: Request, res: Response) {
        const { orderId } = req.params

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

        if (!request_body_validation.success) {
            httpResponse.status = 400
            httpResponse.success = false
            httpResponse.message = "Unable to update order, please check the values"
            httpResponse.errors = request_body_validation.error.formErrors.fieldErrors

            return res.status(httpResponse.status).json(httpResponse)
        }
        try {
            const orderExist = await this.orderUseCase.getById(orderId)

            if (!orderExist) {
                httpResponse.status = 404
                httpResponse.success = false
                httpResponse.message = 'Order Not Found'

                return res.status(httpResponse.status).json(httpResponse)
            }

            const order = await this.orderUseCase.updateById(orderId, request_body_validation.data)


            return res.status(httpResponse.status).json(httpResponse)
        } catch (error) {
            console.error('Error updating a order:', error);

            httpResponse.status = 500
            httpResponse.success = false
            httpResponse.message = 'Internal server error'

            return res.status(httpResponse.status).json(httpResponse);
        }
    }

    async deleteById(req: Request, res: Response) {
        const { orderId } = req.params

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

            if (!orderExist) {
                httpResponse.status = 404
                httpResponse.success = false
                httpResponse.message = 'order Not Found'

                return res.status(httpResponse.status).json(httpResponse)
            }

            const order = await this.orderUseCase.deleteById(orderId)

            return res.status(httpResponse.status).json(httpResponse)
        } catch (error) {
            console.error('Error deleting a order:', error);

            httpResponse.status = 500
            httpResponse.success = false
            httpResponse.message = 'Internal server error'

            return res.status(httpResponse.status).json(httpResponse);
        }
    }

    async amountOrderByStatus(req: Request, res: Response) {
        const httpResponse: RequestHttpResponse = {
            status: 200,
            success: true,
            message: 'Order amount by status'
        }

        try {
            const amount = await this.orderUseCase.amountOrderByStatus()

            httpResponse.data = amount as object

        } catch (error) {
            httpResponse.status = 500
            httpResponse.success = false
            httpResponse.message = 'Internal server error'
        }


        return res.status(httpResponse.status).json(httpResponse)
    }

    async amountOfOrderByType(req: Request, res: Response) {
        const httpResponse: RequestHttpResponse = {
            status: 200,
            success: true,
            message: 'Order amount by type'
        }

        try {
            const amount = await this.orderUseCase.amountOfOrderByType()

            httpResponse.data = amount as object
        } catch (error) {
            httpResponse.status = 500
            httpResponse.success = false
            httpResponse.message = 'Internal server error'
        }

        return res.status(httpResponse.status).json(httpResponse)
    }

    async pendingOrdersCountsByUnities(req: Request, res: Response) {
        const httpResponse: RequestHttpResponse = {
            status: 200,
            success: true,
            message: 'Pending orders by unities'
        }

        try {
            const orders_count = await this.orderUseCase.pendingOrdersCountsByUnities()

            httpResponse.data = orders_count as object
        } catch (error) {
            httpResponse.status = 500
            httpResponse.success = false
            httpResponse.message = 'Internal server error'
        }

        return res.status(httpResponse.status).json(httpResponse)
    }

    async averagetimeOfProcess(req: Request, res: Response) {
        const httpResponse: RequestHttpResponse = {
            status: 200,
            success: true,
            message: 'Average time '
        }

        try {
            const time_proccess = await this.orderUseCase.averagetimeOfProcess()

            httpResponse.data = time_proccess as object

        } catch (error) {
            httpResponse.status = 500
            httpResponse.success = false
            httpResponse.message = 'Internal server error'
        }

        return res.status(httpResponse.status).json(httpResponse)
    }

    async error_rate_percentage(req: Request, res: Response) {
        const httpResponse: RequestHttpResponse = {
            status: 200,
            success: true,
            message: 'Error percentage'
        }

        try {
            const error_rate = await this.orderUseCase.error_rate_percentage()

            httpResponse.data = error_rate as object

        } catch (error) {
            httpResponse.status = 500
            httpResponse.success = false
            httpResponse.message = 'Internal server error'
        }

        return res.status(httpResponse.status).json(httpResponse)

    }
    async late_rate_percentage(req: Request, res: Response) {
        const httpResponse: RequestHttpResponse = {
            status: 200,
            success: true,
            message: 'delay percentage'
        }

        try {
            const delay_rate = await this.orderUseCase.late_rate_percentage()

            httpResponse.data = delay_rate as object

        } catch (error) {
            httpResponse.status = 500
            httpResponse.success = false
            httpResponse.message = 'Internal server error'
        }

        return res.status(httpResponse.status).json(httpResponse)
    }
    async daily_order_rate(req: Request, res: Response) {
        const httpResponse: RequestHttpResponse = {
            status: 200,
            success: true,
            message: 'daily order'
        }

        try {
            const daily_rate = await this.orderUseCase.daily_order_rate()
            
            httpResponse.data = daily_rate as object

        } catch (error) {
            httpResponse.status = 500
            httpResponse.success = false
            httpResponse.message = 'Internal server error'
        }

        return res.status(httpResponse.status).json(httpResponse)

    }
    async average_per_day(req: Request, res: Response) {
        const httpResponse: RequestHttpResponse = {
            status: 200,
            success: true,
            message: 'Average per day'
        }

        try {
            const average_per_day = await this.orderUseCase.average_per_day()
            
            httpResponse.data = average_per_day as object

        } catch (error) {
            httpResponse.status = 500
            httpResponse.success = false
            httpResponse.message = 'Internal server error'
        }

        return res.status(httpResponse.status).json(httpResponse)
    }
}