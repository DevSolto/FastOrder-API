import { PrismaClient, Type } from "@prisma/client";
import { fakerPT_BR as faker } from '@faker-js/faker'
import * as dotenv from 'dotenv'

dotenv.config();

export async function createProducts(amount: number) {
    const prisma = new PrismaClient();
    const productOptions = [Type.SALTY, Type.SWEET];

    for (let i = 0; i < amount; i++) {
        try {
            await prisma.product.create({
                data: {
                    name: faker.commerce.productName(),
                    description: faker.commerce.productDescription(),
                    type: productOptions[Math.round(Math.random())]
                }
            });
        } catch (erro) {
            console.log(erro);
        }
    }
}