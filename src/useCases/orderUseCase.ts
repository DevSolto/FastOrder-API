import { OrderRepository } from "../repositories/orderRepository";
import { createOrderParams, updateOrderParams } from "../types";
import { OrderNotFound } from "../errors/orderErro";

export class OrderUseCase {
    orderRepository = new OrderRepository()

    async getById(orderId: string) {
        const order = await this.orderRepository.getById(orderId)

        return order
    }

    async getAll() {
        const order = await this.orderRepository.getAll()

        return order
    }

    async create(createOrderParams: createOrderParams) {
        const order = await this.orderRepository.create(createOrderParams)

        return order
    }

    async updateById(orderId: string, updateOrderParams: updateOrderParams) {
        const orderExist = await this.orderRepository.getById(orderId)

        const order = await this.orderRepository.updateById(orderId, updateOrderParams)

        return order
    }

    async deleteById(orderId: string) {
        const orderExist = await this.orderRepository.getById(orderId)

        const order = await this.orderRepository.delete(orderId)

        return order
    }
}