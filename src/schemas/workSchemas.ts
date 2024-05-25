import {z} from 'zod'
import { WorkUseCase } from '../useCases/workUseCase';

const workUseCase = new WorkUseCase()

const workUserIdSchema = z
    .string()
    .uuid()
    .min(1)

const workUnitIdSchema = z
    .string()
    .uuid()
    .min(1)

const workStartingDateSchema = z
    .coerce
    .date()

const workEndingDateSchema = z
    .coerce
    .date()


export const createWorkSchema = z.object({
    userId: workUserIdSchema,
    unitId: workUnitIdSchema,
    startingDate: workStartingDateSchema,
    endingDate: workEndingDateSchema,
}).superRefine(async (val, ctx) => {
    const work = await workUseCase.getById(val.userId, val.unitId)

    if(work) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Trabalhador já está registrado",
            path: [
                'worker'
            ]
        })
    }
    
})

export const updateWorkSchema = z.object({
    userId: workUserIdSchema.optional(),
    unitId: workUnitIdSchema.optional(),
    startingDate: workStartingDateSchema.optional(),
    endingDate: workEndingDateSchema.optional(),
}).superRefine(async (val, ctx) => {
    if(val?.userId && val?.unitId) {
        const work = await workUseCase.getById(val.userId, val.unitId)

        if(work) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Trabalhador já está registrado",
                path: [
                    'worker'
                ]
            })
        }
    }
})