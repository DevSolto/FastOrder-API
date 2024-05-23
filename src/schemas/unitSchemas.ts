import { z } from 'zod'
import { UnitUseCase } from '../useCases/unitUseCase'

const unitUseCase = new UnitUseCase()

/* Mensagens de Erro para as validações */
const error_messages = {
    empty_field: 'Preencha esse Campo',
    required_field_in_json: 'Campo não presente no JSON',
    type: {
        string: 'O valor deve ser uma string',
    },
    unique_name: "Nome de Unidade já cadastrado"
}

/* Schema de Validação para o campo Name de Produto */
const unitNameSchema = z
    .string({
        required_error: error_messages.required_field_in_json,
        invalid_type_error: error_messages.type.string
    })
    .min(1, error_messages.empty_field)
    .max(100, 'Campo com valor superior a 50')
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

const unitTypeSchema = z.enum(['SUPPLIER', 'SELLER'], {
    required_error: error_messages.required_field_in_json,
    message: "Valor não permitido"
    /* Personalizar as mensagens */
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
