import { PrismaClient } from "@prisma/client";
import * as dotenv from 'dotenv';

dotenv.config();

export async function createOrderUnities(amount: number) {
    const prisma = new PrismaClient();

    try {
        const orders = await prisma.order.findMany();
        const units = await prisma.unit.findMany();

        if (orders.length === 0 || units.length === 0) {
            console.error("No orders or units found, cannot seed order unities.");
            return;
        }

        for (let i = 0; i < amount; i++) {
            const randomOrder = orders[Math.floor(Math.random() * orders.length)];
            const randomUnit = units[Math.floor(Math.random() * units.length)];

            await prisma.ordersUnities.create({
                data: {
                    orderId: randomOrder.id,
                    unitId: randomUnit.id,
                    type: randomUnit.type,
                },
            });
        }
    } catch (error) {
        console.log(error);
    } finally {
        await prisma.$disconnect();
    }
}

createOrderUnities(50)