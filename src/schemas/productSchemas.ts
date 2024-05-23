import { z } from 'zod'
import { ProductUseCase } from '../useCases/productUseCase'
import { UserUseCase } from '../useCases/userUseCase'

const productUseCase = new ProductUseCase()

/* Mensagens de Erro para as validações */
const error_messages = {
    empty_field: 'Preencha esse Campo',
    required_field_in_json: 'Campo não presente no JSON',
    type: {
        string: 'O valor deve ser uma string',
    },
    unique_name: "Nome do Produto já cadastrado"
}

/* Schema de Validação para o campo Name de Produto */
const productNameSchema = z
    .string({
        required_error: error_messages.required_field_in_json,
        invalid_type_error: error_messages.type.string
    })
    .min(1, error_messages.empty_field)
    .max(100, 'Campo com valor superior a 50')
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
const productTypeSchema = z.string()


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
