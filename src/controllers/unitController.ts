import { UnitUseCase } from "../useCases/unitUseCase";

export class UnitController{
    unitUseCase = new UnitUseCase()

    async create(createUnitParams:{
        name: string,
        description: string,
        type: string
    }){
        
    }
}

class CreateUnitDTO{
    
}