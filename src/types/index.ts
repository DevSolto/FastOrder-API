import { Type, UnitType, Status, Role } from "@prisma/client";

export interface RequestHttpResponse {
    status: number,
    success: boolean,
    message: string,
    data?: object,
    errors?: object
}

export type createUserParams = {
    name: string,
    cpf: string,
    email: string,
    password: string,
    phone: string,
    role: Role
}

export type updateUserParams = {
    name?: string,
    cpf?: string,
    email?: string,
    password?: string,
    phone?: string,
    role?: Role 
}

export type UserJWTPayload = {
    id: string,
    name: string,
    email: string,
    role: string | Role
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

/* Order */
export type createOrderParams = {
    creationDate?: Date,
    receivedDate: Date,
    status?: Status,
    deliveryEstimate: Date,
    userId: string
}

export type updateOrderParams = {
    creationDate?: Date,
    receivedDate?: Date,
    status?: Status,
    deliveryEstimate?: Date,
    userId?: string
}

export type createOrderItemsParams = {
    productId: string,
    orderId: string,
    observation: string,
    amount: number
}

export type updateOrderItemsParams = {
    productId?: string,
    orderId?: string,
    observation?: string,
    amount?:number
}

/* Order Unities */
export type createOrderUnityParams = {
    orderId: string,
    unitId: string,
    type: UnitType,
}

export type updateOrderUnityParams = {
    orderId?: string,
    unitId?: string,
    type?: UnitType,
}