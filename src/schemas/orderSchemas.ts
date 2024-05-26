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


const error_messages = {
    empty_field: 'Fill this field',
    required_field_in_json: 'Not found in JSON',
    type: {
        string: 'The value must be a string',
    },
    max_length: "Maximun number of characters exceeded",
    invalid_uuid: "Invalid UUID",
    invalid_date: "Invalid Date Format",
    status_invalid: `Invalid status, choose a valid status: ${statusEnum.toString()}`
}

const creationDateSchema = z
    .coerce
    .date({message: error_messages.invalid_date})

const receiveDateSchema = z
    .coerce
    .date({message: error_messages.invalid_date})

const deliveryEstimateSchema = z
    .coerce
    .date({message: error_messages.invalid_date})

const statusSchema = z
    .enum(statusEnum, {message: error_messages.status_invalid})

const userIdSchema = z
    .string({
        required_error: error_messages.required_field_in_json,
        invalid_type_error: error_messages.type.string
    })
    .uuid(error_messages.invalid_uuid)
    .min(1, error_messages.empty_field)


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