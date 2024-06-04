import { PrismaClient, Status } from "@prisma/client";
import { createOrderItemsParams, updateOrderItemsParams } from "../types";

export class OrderItemsRepository {
    prisma = new PrismaClient()

    async create(createOrderItemsParams: createOrderItemsParams) {
        const orderItems = await this.prisma.orderItems.create({
            data: createOrderItemsParams
        })

        return orderItems
    }

    async getById(orderId: string, productId: string){
        const orderItems = await this.prisma.orderItems.findUnique({
            where:{
                orderId_productId: {
                    orderId,
                    productId
                }
            }
        })

        return orderItems
    }

    async getAll(){
        const orderItemss = await this.prisma.orderItems.findMany()

        return orderItemss
    }

    public async getItemsByOrderId(orderId: string) {
        const user_works = await this.prisma.orderItems.findMany({
            where: {orderId}
        })

        return user_works
    }

    async updateById(orderId: string, productId: string, updateOrderItemsParams: updateOrderItemsParams){
        const orderItems = await this.prisma.orderItems.update({
            where:{
                orderId_productId: {
                    orderId,
                    productId
                }
            },
            data:updateOrderItemsParams
        })

        return orderItems
    }

    async delete(orderId: string, productId: string){
        const orderItems = await this.prisma.orderItems.delete({
            where: {
                orderId_productId: {
                    orderId,
                    productId
                }
            }
        })

        return orderItems
    }
}