import { z } from 'zod'
import { UserUseCase } from '../useCases/userUseCase'
import validator from 'validator'

const userUseCase = new UserUseCase()

const roles = ['ADMIN', 'SELLER', 'SUPPLIER'] as const

const error_messages = {
    empty_field: 'Fill this field',
    required_field_in_json: 'Not found in JSON',
    type: {
        string: 'The value must be a string',
    },
    max_length: "Maximun number of characters exceeded",
    email_format: "Invalid email format",
    email_in_use: "Email already in use",
    cpf_format: "Invalid CPF format",
    cpf_in_use: "CPF lready in use",
    phone_format: "Invalid phone number format",
    phone_in_use: "previously used phone number",
    role_invalid: `Invalid role, choose a valid role: ${roles.toString()}`,
    url_invalid: "Invalid URL format"
}



const nameSchema = z
    .string({
        required_error: error_messages.required_field_in_json,
        invalid_type_error: error_messages.type.string
    })
    .min(1, error_messages.empty_field)
    .max(50, error_messages.max_length)

// TODO: Validar qtd de caracterres em CPF e Phone
/* TODO: Verificar o formato de E-mail */
const emailSchema = z
    .string({
        required_error: error_messages.required_field_in_json,
        invalid_type_error: error_messages.type.string
    })
    .email({ message: error_messages.email_format })
    .min(1, error_messages.empty_field)
    .max(100, error_messages.max_length)
    .refine(async email => {
        const user = await userUseCase.getByEmail(email)

        return user ? false : true
    }, error_messages.email_in_use)

const passwordSchema = z
    .string({
        required_error: error_messages.required_field_in_json,
        invalid_type_error: error_messages.type.string
    })
    .min(1, error_messages.empty_field)
    .max(60, error_messages.max_length)


/* TODO: Verificar o formato de CPF */
const cpfSchema = z
    .string({
        required_error: error_messages.required_field_in_json,
        invalid_type_error: error_messages.type.string
    })
    .min(11, "CPF must have 11 digits")
    .max(11, "CPF must have 11 digits")
    .refine(async cpf => {
        const user = await userUseCase.getByCpf(cpf)

        return user ? false : true
    }, error_messages.cpf_in_use)

/* TODO: Verificar o formato de Telefone */
const phoneSchema = z
    .string()
    .refine(async phone => validator.isMobilePhone(phone, "pt-BR"), error_messages.phone_format)
    .refine(async phone => {
        const user = await userUseCase.getByPhone(phone)

        return user ? false : true
    }, error_messages.phone_in_use)

const roleSchema = z.enum(roles, { message: error_messages.role_invalid })

export const createUserSchema = z.object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    cpf: cpfSchema,
    phone: phoneSchema,
    role: roleSchema,
})

export const updateUserSchema = z.object({
    name: nameSchema.optional(),
    email: emailSchema.optional(),
    password: passwordSchema.optional(),
    cpf: cpfSchema.optional(),
    phone: phoneSchema.optional(),
    role: roleSchema.optional(),
})