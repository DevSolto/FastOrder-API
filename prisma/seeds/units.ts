import { PrismaClient, UnitType } from "@prisma/client";
import { fakerPT_BR as faker } from '@faker-js/faker'
import * as dotenv from 'dotenv'

dotenv.config();

export async function createUnits(amount:number){
    const prisma = new PrismaClient();
    const units = [UnitType.SELLER, UnitType.SUPPLIER];

    for ( let i = 0; i < amount; i++) {
        try {
            await prisma.unit.create({
                data: {
                    name: faker.company.name(),
                    description: faker.company.catchPhraseDescriptor(),
                    type: units[Math.round(Math.random())]
                }
            });

        } catch (error){
            console.log(error);
    }
    }
}