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
        const works = await this.prisma.works.findMany({
            select: {
                Unit: {
                    select: {
                        id: true,
                        name: true,
                        type: true
                    }
                },
                User: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true
                    }
                },
                startingDate: true,
                endingDate: true,
            }
        })

        return works
    }

    public async getWorksByUserId(userId: string) {
        const user_works = await this.prisma.works.findMany({
            where: {userId},
            select: {
                Unit: {
                    select: {
                        id: true,
                        name: true,
                        type: true
                    }
                },
                User: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true
                    }
                },
                startingDate: true,
                endingDate: true,
            }
        })

        return user_works
    }

    public async getById(userId: string, unitId: string) {
        const work = await this.prisma.works.findUnique({
            where: {
                unitId_userId: {userId, unitId}
            },
            select: {
                Unit: {
                    select: {
                        id: true,
                        name: true,
                        type: true,
                    }
                },
                User: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true
                    }
                },
            }

        })

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