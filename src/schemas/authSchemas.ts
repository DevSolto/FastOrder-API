import {z} from "zod"

const error_messages = {
    empty_field: 'Fill this field',
    required_field_in_json: 'Not found in JSON',
    type: {
        string: 'The value must be a string',
    },
    max_length: "Maximun number of characters exceeded",
    email_format: "Invalid email format",
}

const emailSchema = z
    .string({
        required_error: error_messages.required_field_in_json,
        invalid_type_error: error_messages.type.string
    })
    .email({message: error_messages.email_format})
    .min(1, error_messages.empty_field)
    .max(100, error_messages.max_length)

    
const passwordSchema = z
    .string({
        required_error: error_messages.required_field_in_json,
        invalid_type_error: error_messages.type.string
    })
    .min(1, error_messages.empty_field)
    .max(60, error_messages.max_length)

export const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema
})