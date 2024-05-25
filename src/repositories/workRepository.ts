import { PrismaClient } from "@prisma/client"
import { createWorksParams, updateWorksParams } from "../types"
import {Prisma} from "@prisma/client"

export class WorksRepository {
    prisma = new PrismaClient()

    public async create(createWorksParams: createWorksParams) {
        const work = await this.prisma.works.create({
            data: createWorksParams
        })

        return work
    }

    public getAllWorks = async () => {
        const works = await this.prisma.works.findMany()

        return works
    }

    public async getById(userId: string, unitId: string, options?: {
        include?: Prisma.WorksInclude ,
        select?: Prisma.WorksSelect
    }) {

        const workFindUniqueArgs: Prisma.WorksFindUniqueArgs = {
            where: {
                unitId_userId: {
                    unitId,
                    userId
                }
            },
        }

        if(options?.include)
            workFindUniqueArgs.include = options.include
        
        if(options?.select)
            workFindUniqueArgs.select = options.select
        

        const work = await this.prisma.works.findUnique(workFindUniqueArgs)

        return work
    }

    public async updateById(userId: string, unitId: string, updateWorksParams: updateWorksParams) {
        const workUpdated = await this.prisma.works.update({
            where: {
                unitId_userId: {
                    unitId,
                    userId
                }
            },
            data: updateWorksParams
        })

        return workUpdated
    }

    public async deleteById(userId: string, unitId: string) {
        const workDeleted = await this.prisma.works.delete({
            where: {
                unitId_userId: {
                    unitId,
                    userId
                }
            }
        })

        return workDeleted
    }
}