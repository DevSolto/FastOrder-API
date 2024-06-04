import { PrismaClient } from "@prisma/client"
import { createOrderUnityParams, updateOrderUnityParams } from "../types"
import {Prisma} from "@prisma/client"

export class OrdersUnitiesRepository {
    prisma = new PrismaClient()

    public async create(createOrderUnityParams: createOrderUnityParams) {
        const work = await this.prisma.ordersUnities.create({
            data: createOrderUnityParams
        })

        return work
    }

    public getAllOrdersUnities = async () => {
        const ordersUnities = await this.prisma.ordersUnities.findMany()

        return ordersUnities
    }

    public async getOrdersUnitiesByOrderId(orderId: string) {
        const user_ordersUnities = await this.prisma.ordersUnities.findMany()

        return user_ordersUnities
    }

    public async getOrdersUnitiesByUnitId(unitId: string) {
        const user_ordersUnities = await this.prisma.ordersUnities.findMany()

        return user_ordersUnities
    }

    public async getById(orderId: string, unitId: string) {
        const work = await this.prisma.ordersUnities.findUnique({
            where: {
                unitId_orderId: {orderId, unitId}
            },
        })

        return work
    }

    public async updateById(orderId: string, unitId: string, updateOrderUnityParams: updateOrderUnityParams) {
        const workUpdated = await this.prisma.ordersUnities.update({
            where: {
                unitId_orderId: {orderId, unitId}
            },
            data: updateOrderUnityParams
        })

        return workUpdated
    }

    public async deleteById(orderId: string, unitId: string) {
        const workDeleted = await this.prisma.ordersUnities.delete({
            where: {
                unitId_orderId: {orderId, unitId}
            },
        })

        return workDeleted
    }
}