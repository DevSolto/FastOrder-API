import { PrismaClient } from "@prisma/client";
import { createUnitParams, updateUnitParams } from "../types";

export class UnitRepository{

    // Método para criar unidade 
    prisma = new PrismaClient

    async create(createUnitParams: createUnitParams) {
        const unit = await this.prisma.unit.create({
            data:createUnitParams
        })

        return unit
    }

    async getByName(unitName: string) {
        const unit = await this.prisma.unit.findUnique({
            where: {name: unitName}
        })

        return unit
    }

    async getById(unitId: string) {
        const unit = await this.prisma.unit.findUnique({
            where: {id: unitId}
        })

        return unit
    }

    async getAllUnits() {
        const unit = await this.prisma.unit.findMany()

        return unit 
    }

    async updateById(unitId: string, updateUnitParams: updateUnitParams) {
        const unit = await this.prisma.unit.update({
            where: {id: unitId},
            data: updateUnitParams
        })

        return unit
    }

    async deleteById(unitId: string) {
        const unit = await this.prisma.unit.delete({
            where: {id: unitId}

        })

        return unit
    }
}