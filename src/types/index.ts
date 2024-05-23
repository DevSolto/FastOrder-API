import { Type } from "@prisma/client";

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


