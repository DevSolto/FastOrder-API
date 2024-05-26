import { z } from 'zod'

const orderIdSchema = z.string().uuid()
const unitIdSchema = z.string().uuid()
const typeSchema = z.enum(["SUPPLIER","SELLER"])

export const createOrderUnitiesSchema = z.object({
    orderId: orderIdSchema,
    unitId: unitIdSchema,
    type: typeSchema
})

export const updateOrderUnitiesSchema = z.object({
    orderId: orderIdSchema.optional(),
    unitId: unitIdSchema.optional(),
    type: typeSchema.optional()
})