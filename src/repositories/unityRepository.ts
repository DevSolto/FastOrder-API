import { PrismaClient, UnitType } from "@prisma/client";

export class UnitRepository{

    prisma = new PrismaClient
    async create(createUnitParams:{
        name: string,
        description: string,
        type: UnitType
    }) {
        const unit = await this.prisma.unit.create({
            data:createUnitParams
        })

        return unit
    }
}