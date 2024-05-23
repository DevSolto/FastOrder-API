import { IsNotEmpty, IsString, validate } from "class-validator";
import { UnitUseCase } from "../useCases/unitUseCase";
import { Request, Response } from "express";
import { plainToClass } from "class-transformer";

export class UnitController {
    unitUseCase = new UnitUseCase()

    async create(req: Request, res: Response) {
        try {
            const createUnitDTO = plainToClass(CreateUnitDTO, req.body)
            const errors = await validate(createUnitDTO)

            if (errors.length > 0) {
                res.status(400).json({
                    errors: errors.map(error => error.constraints)
                })
            }

            const unitStatus = ['SUPPLIER', 'SELLER']

            if (!unitStatus.includes(createUnitDTO.type.toUpperCase())) {
                res.status(400).json({
                    message: 'Unit type not valid'
                })
            }

            const unit = await this.unitUseCase.create(createUnitDTO)

            res.status(201).json(unit)

        } catch (error) {
            console.error('Error creating user:', error); 
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

class CreateUnitDTO {
    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Name must be a string' })
    name!: string


    @IsNotEmpty({ message: 'Description is required' })
    @IsString({ message: 'Description must be a string' })
    description!: string

    @IsNotEmpty({ message: 'Type is required' })
    @IsString({ message: 'Type must be a string' })
    type!: string
}