import { Request, Response } from "express";
import { UnitUseCase } from "../useCases/unitUseCase";

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