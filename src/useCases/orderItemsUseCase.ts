import { OrderItemsRepository } from "../repositories/orderItemsRepository"
import { createOrderItemsParams, updateOrderItemsParams } from "../types"
import { OrderItemsNotFound } from "../errors/orderItemsErro"
export class OrderItemsUseCase {
    orderItemRepository = new OrderItemsRepository()

    async create(createOrderItemsParams: createOrderItemsParams) {
        const orderById = await this.orderItemRepository.getById(
            createOrderItemsParams.orderId, createOrderItemsParams.productId
        )

        if(orderById != null) 
            throw new OrderItemsNotFound()

        const orderItems = await this.orderItemRepository.create(createOrderItemsParams)

        return orderItems
    }

    async getById(orderId: string, productId: string){
        const orderItems = await this.orderItemRepository.getById(orderId, productId)

        return orderItems
    }

    async getAll(){
        const orderItemss = await this.orderItemRepository.getAll()

        return orderItemss
    }

    async getItemsByOrderId(orderId: string) {
        const user_works = await this.orderItemRepository.getItemsByOrderId(orderId)

        return user_works
    }

    async updateById(orderId: string, productId: string, updateOrderItemsParams: updateOrderItemsParams){
        const orderById = await this.orderItemRepository.getById(orderId, productId)

        const orderItems = await this.orderItemRepository.updateById(orderId, productId, updateOrderItemsParams)

        return orderItems
    }

    async deleteById(orderId: string, productId: string){
        const orderById = await this.orderItemRepository.getById(orderId, productId)

        const orderItems = await this.orderItemRepository.delete(orderId, productId)

        return orderItems
    }
}