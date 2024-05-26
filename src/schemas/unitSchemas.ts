import { z } from 'zod'
import { UnitUseCase } from '../useCases/unitUseCase'

const unitUseCase = new UnitUseCase()
const types = ["SUPPLIER","SELLER"] as const
/* Mensagens de Erro para as validações */
const error_messages = {
    empty_field: 'Fill this field',
    required_field_in_json: 'Not found in JSON ',
    type: {
        string: 'The value must be a string',
    },
    unique_name: "Unity name already in use",
    max_length: "Maximun number of characters exceeded",
    type_invalid: `Invalid unity type, choose a valid type: ${types.toString()}`
}

/* Schema de Validação para o campo Name de Produto */
const unitNameSchema = z
    .string({
        required_error: error_messages.required_field_in_json,
        invalid_type_error: error_messages.type.string
    })
    .min(1, error_messages.empty_field)
    .max(100, error_messages.max_length)
    .refine(async name => {
        const unit = await unitUseCase.getByName(name)

        return unit ? false : true
    }, error_messages.unique_name)

/* Schema de validação para o campo Description de Produto */
const unitDescriptionSchema = z
    .string({
        required_error: error_messages.required_field_in_json,
        invalid_type_error: error_messages.type.string
    })
    .min(1, error_messages.empty_field)

const unitTypeSchema = z.enum(types, {
    required_error: error_messages.required_field_in_json,
    message: error_messages.type_invalid
})

export const createUnitSchema = z.object({
    name: unitNameSchema,
    description: unitDescriptionSchema,
    type: unitTypeSchema
})

/* Schema de validação para o atualização de Produto */
export const updateUnitSchema = z.object({
    name: unitNameSchema.optional(),
    description: unitDescriptionSchema.optional(),
    type: unitTypeSchema.optional()
})
