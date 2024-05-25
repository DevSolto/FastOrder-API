import { PrismaClient, Status } from "@prisma/client";
import { createOrderParams, updateOrderParams } from "../types";

export class OrderRepository {
    prisma = new PrismaClient()

    async create(createOrderParams: createOrderParams) {
        const order = await this.prisma.order.create({
            data: createOrderParams
        })

        return order
    }

    async getById(orderId: string){
        const order = await this.prisma.order.findUnique({
            where:{
                id: orderId
            }
        })

        return order
    }

    async getAll(){
        const orders = await this.prisma.order.findMany()

        return orders
    }

    async updateById(orderId:string, updateOrderParams: updateOrderParams){
        const order = await this.prisma.order.update({
            where:{
                id:orderId
            },
            data:updateOrderParams
        })

        return order
    }

    async delete(orderId:string){
        const order = await this.prisma.order.delete({
            where: {id: orderId}
        })

        return order
    }
}