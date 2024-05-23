import { PrismaClient, UnitType } from "@prisma/client";

export class UnitRepository{

    // Método para criar unidade 
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

    // Método para buscar unidade pelo nome 

    async getByName(unitName:string){
        const unit = await this.prisma.unit.findUnique({
            where:{
                name:unitName
            }
        })
        return unit;
    }
    // Método para buscar todas as unidades 
    async getAllUnits(){
        const units = await this.prisma.unit.findMany();
        return units;
    }
    
    // Método para encontrar unidade pelo Id 

    async getById(unitId:string){
        const unit = await this.prisma.unit.findUnique({
            where:{
                id:unitId
            }
        })
        return unit;
    }

    // Método para atualizar unidade pelo id

    async updateById(unitId:string, unitParams:{
        name:string 
        description:string
        type:UnitType;
    }){
        const unit = await this.prisma.unit.update({
            where:{
                id:unitId
            },
            data:unitParams
        })
        return unit;
    }

    //Método para excluir uma unidade pelo Id  

    async deleteById(unitId:string){
        const unit = await this.prisma.unit.delete({
            where:{
                id:unitId
            }
        })

        return unit
    }
}