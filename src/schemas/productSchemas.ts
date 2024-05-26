import { z } from 'zod'
import { ProductUseCase } from '../useCases/productUseCase'
import { UserUseCase } from '../useCases/userUseCase'

const productUseCase = new ProductUseCase()

const types = ['SALTY', 'SWEET'] as const
/* Mensagens de Erro para as validações */
const error_messages = {
    empty_field: 'Fill this field',
    required_field_in_json: 'Not found in JSON ',
    type: {
        string: 'The value must be a string',
    },
    unique_name: "Product name already in use",
    max_length: "Maximun number of characters exceeded",
    type_invalid: `Invalid product type, choose a valid type: ${types.toString()}`
}

/* Schema de Validação para o campo Name de Produto */
const productNameSchema = z
    .string({
        required_error: error_messages.required_field_in_json,
        invalid_type_error: error_messages.type.string
    })
    .min(1, error_messages.empty_field)
    .max(100, error_messages.max_length)
    .refine(async name => {
        const product = await productUseCase.getByName(name)

        return product ? false : true
    }, error_messages.unique_name)

/* Schema de validação para o campo Description de Produto */
const productDescriptionSchema = z
    .string({
        required_error: error_messages.required_field_in_json,
        invalid_type_error: error_messages.type.string
    })
    .min(1, error_messages.empty_field)

/* Schema de validação para o campo Type de Produto */
const productTypeSchema = z.enum(types, {
    required_error: error_messages.required_field_in_json,
    message: error_messages.type_invalid
    /* Personalizar as mensagens */
})


/* Schema de validação para a criação de um Produto */
export const createProductSchema = z.object({
    name: productNameSchema,
    description: productDescriptionSchema,
    type: productTypeSchema
})

/* Schema de validação para o atualização de Produto */
export const updateProductSchema = z.object({
    name: productNameSchema.optional(),
    description: productDescriptionSchema.optional(),
    type: productTypeSchema.optional()
})
