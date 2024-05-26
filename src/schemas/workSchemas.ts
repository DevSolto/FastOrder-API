import {z} from 'zod'
import { WorkUseCase } from '../useCases/workUseCase';

const workUseCase = new WorkUseCase()

const error_messages = {
    empty_field: 'Fill this field',
    required_field_in_json: 'Not found in JSON',
    type: {
        string: 'The value must be a string',
    },
    max_length: "Maximun number of characters exceeded",
    invalid_uuid: "Invalid UUID",
    invalid_date: "Invalid Date Format",
    worker_already_register: "Work Already Register"
}

const workUserIdSchema = z
    .string({
        required_error: error_messages.required_field_in_json,
        invalid_type_error: error_messages.type.string
    })
    .uuid(error_messages.invalid_uuid)
    .min(1, error_messages.empty_field)

const workUnitIdSchema = z
    .string({
        required_error: error_messages.required_field_in_json,
        invalid_type_error: error_messages.type.string
    })
    .uuid(error_messages.invalid_uuid)
    .min(1, error_messages.empty_field)

const workStartingDateSchema = z
    .coerce
    .date({message: error_messages.invalid_date})

const workEndingDateSchema = z
    .coerce
    .date({message: error_messages.invalid_date})


export const createWorkSchema = z.object({
    userId: workUserIdSchema,
    unitId: workUnitIdSchema,
    startingDate: workStartingDateSchema,
    endingDate: workEndingDateSchema,
}).superRefine(async (val, ctx) => {
    const work = await workUseCase.getById(val.userId, val.unitId)

    if(work) 
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: error_messages.worker_already_register,
            path: ['worker']
        })
})


export const updateWorkSchema = z.object({
    userId: workUserIdSchema.optional(),
    unitId: workUnitIdSchema.optional(),
    startingDate: workStartingDateSchema.optional(),
    endingDate: workEndingDateSchema.optional(),
}).superRefine(async (val, ctx) => {
    if(val?.userId && val?.unitId) {
        const work = await workUseCase.getById(val.userId, val.unitId)

        if(work) 
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: error_messages.worker_already_register,
                path: ['worker']
            })
    }
})