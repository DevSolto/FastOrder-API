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

    async getById(orderId: string) {
        const order = await this.prisma.order.findUnique({
            where: {
                id: orderId
            }
        })

        return order
    }

    async getAll() {
        const orders = await this.prisma.order.findMany()

        return orders
    }

    async updateById(orderId: string, updateOrderParams: updateOrderParams) {
        const order = await this.prisma.order.update({
            where: {
                id: orderId
            },
            data: updateOrderParams
        })

        return order
    }

    async delete(orderId: string) {
        const order = await this.prisma.order.delete({
            where: { id: orderId }
        })

        return order
    }

    async amountOrderByStatus() {
        const amount_order = await this.prisma.$queryRaw`
            SELECT status, COUNT(*)::text AS order_count FROM "Order" GROUP BY status;
        `
        return amount_order
    }


    async amountOfOrderByType() {
        const amount_order = await this.prisma.$queryRaw`
            SELECT "Product"."type",
                COUNT(DISTINCT "OrderItems"."orderId")::text AS order_count
            FROM "OrderItems"
            JOIN "Product" ON "OrderItems"."productId" = "Product"."id"
            GROUP BY "Product"."type";
        `

        return amount_order
    }

    // Quantidade de pedidos pendentes por unidade:
    async pendingOrdersCountsByUnities() {
        const t = await this.prisma.$queryRaw`
            SELECT 
                "OrdersUnities"."unitId" as unit_id,
                "Unit".name as unit_name,
                COUNT(*)::text AS pending_orders
            FROM "Order"
            JOIN "OrdersUnities" ON "Order"."id" = "OrdersUnities"."orderId"
            JOIN "Unit" ON "Unit"."id" = "OrdersUnities"."unitId"
            WHERE "Order"."status" = 'OPENED' 
            GROUP BY "OrdersUnities"."unitId", "Unit"."name";
            `
        return t
    }

    async averagetimeOfProcess() {
        const time_proccess = await this.prisma.$queryRaw`
            SELECT 
                AVG(EXTRACT(EPOCH FROM ("receivedDate" - "creationDate"))) / 3600 / 24.0 AS processing_time_hours
            FROM "Order"
            WHERE "receivedDate" IS NOT NULL;
        `
        return time_proccess
    }

    async error_rate_percentage() {
        const error_rate = await this.prisma.$queryRaw`
            SELECT 
                (COUNT(*) FILTER (WHERE "status" = 'DELIVERED_ERROR')::DECIMAL / COUNT(*)) * 100 AS error_rate_percentage
            FROM "Order";
        `
        return error_rate
    }

    async late_rate_percentage() {
        const late_rate = await this.prisma.$queryRaw`
        SELECT 
            (COUNT(*) FILTER (WHERE "status" = 'ON_DELIVERY' AND "deliveryEstimate" < NOW())::DECIMAL / COUNT(*)) * 100 AS late_rate_percentage
        FROM "Order";
        `
        return late_rate
    }

    async daily_order_rate() {
        const daily_order_rate = await this.prisma.$queryRaw`
            SELECT AVG(order_count) AS avg_daily_orders
            FROM (
                SELECT 
                    DATE("creationDate") AS order_date,
                    COUNT(*) AS order_count
                FROM "Order"
                GROUP BY DATE("creationDate")
            ) daily_orders;
        `

        return daily_order_rate
    }

    async average_per_day () {
        const average_per_day = await this.prisma.$queryRaw`
            SELECT 
                CASE EXTRACT(DOW FROM "creationDate")
                    WHEN 0 THEN 'Domingo'
                    WHEN 1 THEN 'Segunda'
                    WHEN 2 THEN 'Terça'
                    WHEN 3 THEN 'Quarta'
                    WHEN 4 THEN 'Quinta'
                    WHEN 5 THEN 'Sexta'
                    WHEN 6 THEN 'Sabado'
                END AS day_of_week,
                AVG(COUNT(*)) OVER (PARTITION BY EXTRACT(DOW FROM "creationDate")) AS avg_products_per_day
            FROM "OrderItems"
            JOIN "Order" ON "OrderItems"."orderId" = "Order"."id"
            GROUP BY EXTRACT(DOW FROM "creationDate"), day_of_week;
        `

        return average_per_day
    }
    
}