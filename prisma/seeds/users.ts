import { PrismaClient, Role } from "@prisma/client";
import { fakerPT_BR as faker } from '@faker-js/faker';
import { generate as generateCPF } from 'gerador-validador-cpf';
import * as dotenv from 'dotenv';

dotenv.config();

// Função para criar usuários fictícios
export async function createUsers(amount: number) {
    const prisma = new PrismaClient();
    const roles = [Role.ADMIN, Role.SELLER, Role.SUPPLIER];

    for (let i = 0; i < amount; i++) {
        try {
            await prisma.user.create({
                data: {
                    name: faker.person.fullName(),
                    email: faker.internet.email(),
                    password: faker.internet.password(),
                    phone: faker.phone.number(),
                    role: roles[Math.floor(Math.random() * roles.length)],
                    cpf: generateCPF()
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    await prisma.$disconnect();
}