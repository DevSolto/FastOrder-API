import { createOrderUnityParams, updateOrderUnityParams } from "../types"
import { OrdersUnitiesRepository } from "../repositories/orderUnitiesRepository"

export class OrdersUnitiesUseCase {
    orderUnitiesRepository = new OrdersUnitiesRepository()

    public async create(createOrderUnityParams: createOrderUnityParams) {
        const orderUnitiesExist = await this.orderUnitiesRepository.getById(
            createOrderUnityParams.orderId, createOrderUnityParams.unitId
        )

        //Verificações
        /* if(workById != null) 
            throw new WorkIAlreadyExists() */

        const orderUnities = await this.orderUnitiesRepository.create(createOrderUnityParams)

        return orderUnities
    }

    public getAllOrdersUnities = async () => {
        const ordersUnities = await this.orderUnitiesRepository.getAllOrdersUnities()

        return ordersUnities
    }

    public async getOrdersUnitiesByOrderId(orderId: string) {
        const user_ordersUnities = await this.orderUnitiesRepository.getOrdersUnitiesByOrderId(orderId)

        return user_ordersUnities
    }

    public async getOrdersUnitiesByUnitId(unitId: string) {
        const user_ordersUnities = await this.orderUnitiesRepository.getOrdersUnitiesByUnitId(unitId)

        return user_ordersUnities
    }

    public async getById(orderId: string, unitId: string) {
        const work = await this.orderUnitiesRepository.getById(orderId, unitId)

        return work
    }

    public async updateById(orderId: string, unitId: string, updateOrderUnityParams: updateOrderUnityParams) {
        const workUpdated = await this.orderUnitiesRepository.updateById(orderId, unitId, updateOrderUnityParams)

        return workUpdated
    }

    public async deleteById(orderId: string, unitId: string) {
        const workDeleted = await this.orderUnitiesRepository.deleteById(orderId, unitId)


        return workDeleted
    }
}