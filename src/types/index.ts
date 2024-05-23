import { Type } from "@prisma/client";

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


