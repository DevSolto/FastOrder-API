import { UnitRepository } from "../repositories/unityRepository"
import { createUnitParams, updateUnitParams } from "../types"
import { UnitNameBeingUsed, UnitNotFound } from "../errors/unitErro"

export class UnitUseCase{
    unitRepository = new UnitRepository()

    async create(createUnitParams: createUnitParams){
        // TODO: Validar se o nome ja existe
        const unitByName = await this.unitRepository.getByName(createUnitParams.name)

        if(unitByName)
            throw new UnitNameBeingUsed(unitByName.name)

        const unit = await this.unitRepository.create(createUnitParams)

        return unit
    }

    async getById(unitId: string){
        const unitById = await this.unitRepository.getById(unitId)

        return unitById
    }

    async getByName(unitName: string){
        const unitByName = await this.unitRepository.getByName(unitName)

        return unitByName
    }

    async getAllUnits(){
        const units = await this.unitRepository.getAllUnits()

        return units    
    }

    async updateById(unitId: string, updateUnitParams: updateUnitParams) {
        const unitExist = await this.unitRepository.getById(unitId)

        if(unitExist == null)
            throw new UnitNotFound()

        if(updateUnitParams.name) {
            const unitByName = await this.unitRepository.getByName(updateUnitParams.name)

            if(unitByName) 
                throw new UnitNameBeingUsed(updateUnitParams.name)
        }

        const unit = await this.unitRepository.updateById(unitId, updateUnitParams)

        return unit  
    }
    
    async deleteById(unitId: string){
        const unit = await this.unitRepository.deleteById(unitId)

        return unit  
    }
}