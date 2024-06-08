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

    async amountOrderByStatus() {
        const amount_order = await this.orderRepository.amountOrderByStatus()

        return amount_order
    }

    async amountOfOrderByType() {
        const amount_order = await this.orderRepository.amountOfOrderByType()

        return amount_order
    }

    async pendingOrdersCountsByUnities() {
        const amount_order = await this.orderRepository.pendingOrdersCountsByUnities()

        return amount_order
    }

    async averagetimeOfProcess() {
        const time_proccess = await this.orderRepository.averagetimeOfProcess()

        return time_proccess
    }

    async error_rate_percentage() {
        const error_rate = await this.orderRepository.error_rate_percentage()

        return error_rate
    }

    async late_rate_percentage() {
        const late_rate = await this.orderRepository.late_rate_percentage()

        return late_rate
    }

    async daily_order_rate() {
        const daily_rate = await this.orderRepository.daily_order_rate()

        return daily_rate
    }

    async average_per_day() {
        const average_per_day = await this.orderRepository.average_per_day()

        return average_per_day
    }

}