import { PrismaClient, Status } from "@prisma/client";
import { fakerPT_BR as faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';

dotenv.config();

export async function createOrders(amount: number) {
    const prisma = new PrismaClient();
    const statusOptions = [Status.CANCELLED, Status.DELIVERED, Status.DELIVERED_ERROR, Status.ON_DELIVERY, Status.OPENED, Status.PRODUCING, Status.REFFUSED];

    try {
        const users = await prisma.user.findMany();
        if (users.length === 0) {
            console.error("No users found, cannot seed orders.");
            return;
        }

        for (let i = 0; i < amount; i++) {
            const randomUser = users[Math.floor(Math.random() * users.length)];

            await prisma.order.create({
                data: {
                    creationDate: faker.date.anytime(),
                    receivedDate: faker.date.anytime(),
                    status: statusOptions[Math.floor(Math.random() * statusOptions.length)],
                    deliveryEstimate: faker.date.anytime(),
                    userId: randomUser.id // Conectar com o ID do usuário diretamente
                }
            });
        }
    } catch (error) {
        console.log(error);
    } finally {
        await prisma.$disconnect();
    }
}

createOrders(10); // Chame a função com a quantidade desejada
