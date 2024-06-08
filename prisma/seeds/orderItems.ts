import { PrismaClient } from "@prisma/client";
import { fakerPT_BR as faker } from "@faker-js/faker";
import * as dotenv from 'dotenv';

dotenv.config();

export async function createOrderItems(amount: number) {
    const prisma = new PrismaClient();

    try {
        const orders = await prisma.order.findMany();
        const products = await prisma.product.findMany();

        if (orders.length === 0 || products.length === 0) {
            console.error("No orders or products found, cannot seed order items.");
            return;
        }

        for (let i = 0; i < amount; i++) {
            const randomOrder = orders[Math.floor(Math.random() * orders.length)];
            const randomProduct = products[Math.floor(Math.random() * products.length)];

            await prisma.orderItems.create({
                data: {
                    observation: faker.word.words(),
                    amount: faker.number.int({ min: 1, max: 100 }), // Gera uma quantidade aleatória
                    orderId: randomOrder.id,  // Conecta-se ao pedido aleatório selecionado
                    productId: randomProduct.id // Conecta-se ao produto aleatório selecionado
                }
            });
        }
    } catch (error) {
        console.log(error);
    } finally {
        await prisma.$disconnect();
    }
}

createOrderItems(10); // Chame a função com a quantidade desejada
