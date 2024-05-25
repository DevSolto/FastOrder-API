import { z } from 'zod'

const statusEnum = [
    'OPENED',
    'CANCELLED',
    'REFFUSED',
    'PRODUCING',
    'ON_DELIVERY',
    'DELIVERED',
    'DELIVERED_ERROR'
] as const

const creationDateSchema = z.coerce.date()
const receiveDateSchema = z.coerce.date()
const deliveryEstimateSchema = z.coerce.date()
const statusSchema = z.enum(statusEnum)
const userIdSchema = z.string()

export const createOrderSchema = z.object({
    creationDate: creationDateSchema,
    receivedDate: receiveDateSchema,
    status: statusSchema,
    deliveryEstimate: deliveryEstimateSchema,
    userId: userIdSchema
})

export const updateOrderSchema = z.object({
    creationDate: creationDateSchema.optional(),
    receivedDate: receiveDateSchema.optional(),
    status: statusSchema.optional(),
    deliveryEstimate: deliveryEstimateSchema.optional(),
    userId: userIdSchema.optional()
})