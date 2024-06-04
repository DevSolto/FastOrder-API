import { z } from 'zod'

const error_messages = {
    empty_field: 'Fill this field',
    required_field_in_json: 'Not found in JSON',
    type: {
        string: 'The value must be a string',
        number: 'The value must be a number'
    },
    max_length: "Maximun number of characters exceeded",
    invalid_uuid: "Invalid UUID",
}

const uuidSchema = z
    .string({
        required_error: error_messages.required_field_in_json,
        invalid_type_error: error_messages.type.string
    })
    .uuid(error_messages.invalid_uuid)
    .min(1, error_messages.empty_field)

const observationSchema = z.string({
    required_error: error_messages.required_field_in_json,
    invalid_type_error: error_messages.type.string
})

const amountSchema = z.coerce.number({
    required_error: error_messages.required_field_in_json,
    invalid_type_error: error_messages.type.number
})
    .min(1)



export const createOrderItemSchema = z.object({
    orderId: uuidSchema,
    productId: uuidSchema,
    observation: observationSchema,
    amount: amountSchema
})

export const updateOrderItemSchema = z.object({
    orderId: uuidSchema.optional(),
    productId: uuidSchema.optional(),
    observation: observationSchema.optional(),
    amount: amountSchema.optional()
})