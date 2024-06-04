import { PrismaClient } from "@prisma/client";
import { fakerPT_BR as faker } from "@faker-js/faker";
import * as dotenv from 'dotenv';

dotenv.config();

export async function createWorks(amount: number) {
    const prisma = new PrismaClient();

    try {
        const users = await prisma.user.findMany();
        const units = await prisma.unit.findMany();

        if (users.length === 0 || units.length === 0) {
            console.error("No users or units found, cannot seed works.");
            return;
        }

        for (let i = 0; i < amount; i++) {
            const randomUser = users[Math.floor(Math.random() * users.length)];
            const randomUnit = units[Math.floor(Math.random() * units.length)];

            await prisma.works.create({
                data: {
                    startingDate: faker.date.anytime(),
                    endingDate: faker.date.anytime(),
                    userId: randomUser.id,
                    unitId: randomUnit.id,
                }
            });
        }
    } catch (error) {
        console.log(error);
    } finally {
        await prisma.$disconnect();
    }
}

createWorks(10); // Chame a função com a quantidade desejada
