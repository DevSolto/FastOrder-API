import { PrismaClient, Status } from "@prisma/client";

export class OrderRepository {
    prisma = new PrismaClient()
    async create(createOrderParams: {
        deliveryEstimate: Date | null
        userId: string | null
    }) {
        const order = await this.prisma.order.create({
            data:createOrderParams
        })

        return order
    }

    async getById(orderId:string){
        const order = await this.prisma.order.findUnique({
            where:{
                id:orderId
            }
        })

        return order
    }

    async getAll(){
        const orders = await this.prisma.order.findMany()

        return orders
    }

    async updateById(orderId:string, updateOrderParams:{
        receiveDate:Date,
        status:Status,
        userId:string
    }){
        const order = await this.prisma.order.update({
            where:{
                id:orderId
            },
            data:updateOrderParams
        })

        return order
    }
}