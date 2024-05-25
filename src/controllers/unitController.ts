import { Request, Response } from "express";
import { UnitUseCase } from "../useCases/unitUseCase";
import { createUnitParams } from "../types";
import { Request, Response } from "express"
import validator from "validator"
import { RequestHttpResponse } from "../types"
import { createUnitSchema, updateUnitSchema } from "../schemas/unitSchemas";


export class UnitController {
export class UnitController {
    unitUseCase = new UnitUseCase()

    async create(req: Request, res: Response) {
        try {

        } catch (error) {
            console.error('Error fetching user by ID:', error); // Log de erro no servidor
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    }
}

class CreateUnitDTO {

}