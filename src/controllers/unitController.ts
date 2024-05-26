
import { UnitUseCase } from "../useCases/unitUseCase";
import { createUnitParams } from "../types";
import { Request, Response } from "express"
import validator from "validator"
import { RequestHttpResponse } from "../types"
import { createUnitSchema, updateUnitSchema } from "../schemas/unitSchemas";

export class UnitController {
    unitUseCase = new UnitUseCase()

    async getById(req: Request, res: Response) {
        const {unitId} = req.params

        const httpResponse: RequestHttpResponse = {
            status: 200,
            success: true,
            message: "unit list"
        }

        const isUuid = validator.isUUID(unitId)

        if (!isUuid) {
            httpResponse.status - 400
            httpResponse.success = false
            httpResponse.message = `The id ${unitId} is not valid.`
            
            return res.status(httpResponse.status).json(httpResponse)
        }

        try {
            const unit = await this.unitUseCase.getById(unitId)

            if(!unit) { // VERIFICA
                httpResponse.status = 404
                httpResponse.success = false
                httpResponse.message =  'unit Not Found'

                return res.status(httpResponse.status).json(httpResponse)
            }    

            httpResponse.data = unit

           return res.status(httpResponse.status).json(httpResponse)

        } catch (error) {
            console.error('Error fetching unit by ID:', error);

            httpResponse.status = 500
            httpResponse.success = false
            httpResponse.message = 'Internal server error'
            
           return  res.status(httpResponse.status).json(httpResponse); 

        }
    }

    async getAllUnits(req: Request, res: Response) {
        const httpResponse: RequestHttpResponse = {
            status: 200,
            success: true,
            message: "Unit list"
        }



        try {
            const units = await this.unitUseCase.getAllUnits()

            httpResponse.data = units
            
            return res.status(httpResponse.status).json(httpResponse)

        } catch (error) {
            console.error('Error fetching all units:', error);
            
            httpResponse.status = 500
            httpResponse.success = false
            httpResponse.message = 'Internal server error'
            
           return  res.status(httpResponse.status).json(httpResponse); 
        }
    }

    async create(req: Request, res: Response){
        const request_body_validation = await createUnitSchema.safeParseAsync(req.body)

        const httpResponse: RequestHttpResponse = {
            status: 200,
            success: true,
            message: "Unit created successfully"
        }

        if(!request_body_validation.success){
            httpResponse.status = 400
            httpResponse.success = false
            httpResponse.message = "Unable to create unit, please check values"
            httpResponse.errors = request_body_validation.error.formErrors.fieldErrors
            
            return res.status(httpResponse.status).json(httpResponse)
        }

        try {
            const unit = await this.unitUseCase.create(request_body_validation.data)

            res.status(201).json(unit)
        } catch (error) {
            console.error('Error creating a unit:', error);
            
            httpResponse.status = 500
            httpResponse.success = false
            httpResponse.message = 'Internal server error'
            
           return  res.status(httpResponse.status).json(httpResponse); 
        }
    }

    async updateById(req: Request, res: Response) {
        const {unitId} = req.params

        const httpResponse: RequestHttpResponse = {
            status: 200,
            success: true,
            message: "successfully unit update"
        }

        const isUuid = validator.isUUID(unitId) 
        const request_body_validation = await updateUnitSchema.safeParseAsync(req.body)

        if (!isUuid) {
            httpResponse.status = 400
            httpResponse.success = false
            httpResponse.message = `The id ${unitId} is not valid.`
            
            return res.status(httpResponse.status).json(httpResponse)
        }

        if(!request_body_validation.success){
            httpResponse.status = 400
            httpResponse.success = false
            httpResponse.message = "Unable to update the unit, please check the values"
            httpResponse.errors = request_body_validation.error.formErrors.fieldErrors
            
            return res.status(httpResponse.status).json(httpResponse)
        }

        try {
            const unitExist = await this.unitUseCase.getById(unitId)

            if(!unitExist) { // VERIFICA
                httpResponse.status = 404
                httpResponse.success = false
                httpResponse.message =  'Unit Not Found'

                return res.status(httpResponse.status).json(httpResponse)
            }    
            
            await this.unitUseCase.updateById(unitId, request_body_validation.data)
            
            return res.status(httpResponse.status).json(httpResponse)
        } catch (error) {
            console.error('Error updating a unit:', error);
            
            httpResponse.status = 500
            httpResponse.success = false
            httpResponse.message = 'Internal server error'
            
           return  res.status(httpResponse.status).json(httpResponse); 
        }
    }
    
    async deleteById(req: Request, res: Response) {
        const {unitId} = req.params
        
        const httpResponse: RequestHttpResponse = {
            status: 200,
            success: true,
            message: 'unit Deleted Succefully'
        }

        const isUuid = validator.isUUID(unitId) 

        if (!isUuid) {
            httpResponse.status = 400
            httpResponse.success = false
            httpResponse.message = `The id ${unitId} is not valid.`
            
            return res.status(httpResponse.status).json(httpResponse)
        }

        try {
            const unitExist = await this.unitUseCase.getById(unitId)

            if(!unitExist) { //VERIFICA
                httpResponse.status = 404
                httpResponse.success = false
                httpResponse.message =  'unit Not Found'

                return res.status(httpResponse.status).json(httpResponse)
            }    
            
            await this.unitUseCase.deleteById(unitId)

            return res.status(httpResponse.status).json(httpResponse)
        } catch (error) {
            console.error('Error deleting a unit:', error);
            
            httpResponse.status = 500
            httpResponse.success = false
            httpResponse.message = 'Internal server error'
            
           return  res.status(httpResponse.status).json(httpResponse); 
        }
    }

}