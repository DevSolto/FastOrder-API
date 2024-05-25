import { z } from 'zod'


const orderIdSchema = z.string()
const productIdSchema = z.string()
const observationSchema = z.string()
const amountSchema = z.coerce.number()

export const createOrderItemSchema = z.object({
    orderId: orderIdSchema,
    productId: productIdSchema,
    observation: observationSchema,
    amount: amountSchema
})

export const updateOrderItemSchema = z.object({
    orderId: orderIdSchema.optional(),
    productId: productIdSchema.optional(),
    observation: observationSchema.optional(),
    amount: amountSchema.optional()
})