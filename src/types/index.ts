import { Type, UnitType } from "@prisma/client";

export interface RequestHttpResponse {
    status: number,
    success: boolean,
    message: string,
    data?: object,
    errors?: object
}

export type createProductParams = {
    name: string,
    description: string,
    type: Type,
}

export type updateProductParams = {
    name?: string,
    description?: string,
    type?: Type,
}

/* Units */
export type createUnitParams = {
    name: string,
    description: string,
    type: UnitType
}

export type updateUnitParams = {
    name?: string,
    description?: string,
    type?: UnitType
}

/* Works */
export type createWorksParams = {
    userId: string,
    unitId: string,
    startingDate: Date,
    endingDate: Date,
}

export type updateWorksParams = {
    userId?: string,
    unitId?: string,
    startingDate?: Date,
    endingDate?: Date,
}


