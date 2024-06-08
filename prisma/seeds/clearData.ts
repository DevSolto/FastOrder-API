import { PrismaClient } from "@prisma/client";
import * as dotenv from 'dotenv';

dotenv.config();

export async function clearDatabase() {
    const prisma = new PrismaClient();

    try {
        // Deletar dados das tabelas dependentes primeiro
        await prisma.orderItems.deleteMany({});
        await prisma.ordersUnities.deleteMany({});
        await prisma.works.deleteMany({});

        // Deletar dados das tabelas principais
        await prisma.order.deleteMany({});
        await prisma.unit.deleteMany({});
        await prisma.user.deleteMany({});
        await prisma.product.deleteMany({});

        console.log("Todas as tabelas foram esvaziadas.");
    } catch (error) {
        console.error("Erro ao esvaziar o banco de dados:", error);
    } finally {
        await prisma.$disconnect();
    }
}

clearDatabase();
