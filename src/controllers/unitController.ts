import { IsNotEmpty, IsString } from "class-validator";
import { UnitUseCase } from "../useCases/unitUseCase";
import { Request, Response } from "express";

export class UnitController{
    unitUseCase = new UnitUseCase()

    async create(req:Request, res:Response){
        try {
            
        } catch (error) {
            
        }
    }
}

class CreateUnitDTO{
    @IsNotEmpty({message: 'Name is required'})
    @IsString({message:'Name must be a string'})
    name!: string


    @IsNotEmpty({message: 'Description is required'})
    @IsString({message:'Description must be a string'})
    description!: string

    @IsNotEmpty({message: 'Type is required'})
    @IsString({message:'Type must be a string'})
    type!: string
}