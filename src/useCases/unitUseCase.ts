import { UnitType } from "@prisma/client"
import { UnitRepository } from "../repositories/unityRepository"

export class UnitUseCase{
    unitRepository = new UnitRepository()
    async create(createUnitParams:{
        name: string,
        description: string,
        type: string
    }){
        // TODO: Validar se o nome ja existe

        let typeUnit:UnitType

        switch (createUnitParams.type.toUpperCase) {
            case UnitType.SELLER.toString:
                typeUnit = UnitType.SELLER
                break;
            
            default:
                typeUnit = UnitType.SUPPLIER
                break;
        }

        const unit = await this.unitRepository.create({
            description:createUnitParams.description,
            name:createUnitParams.name,
            type:typeUnit
        })
        return unit
    }
}