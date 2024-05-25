import { WorksRepository } from "../repositories/workRepository"
import { createWorksParams, updateWorksParams } from "../types"
import { WorkIAlreadyExists, WorkNotFound } from "../errors/workErro"

export class WorkUseCase {
    workRepository = new WorksRepository

    async getById(userId: string, unitId: string) {
        const work = await this.workRepository.getById(userId, unitId)

        return work
    }

    getAllWorks = async () => {
        const works = await this.workRepository.getAllWorks()

        return works
    }

    async getWorksByUserId(userId: string) {
        const user_works = await this.workRepository.getWorksByUserId(userId)

        return user_works
    }

    async create(createworkParams: createWorksParams) {
        const workById = await this.workRepository.getById(
            createworkParams.userId, createworkParams.unitId
        )

        //Verificações
        if(workById != null) 
            throw new WorkIAlreadyExists()

        const work = await this.workRepository.create(createworkParams)

        return work
    }


    async updateById(workId: string, unitId: string, updateWorkParams: updateWorksParams) {
        const workExist = await this.workRepository.getById(workId, unitId)

        if(workExist == null)
            throw new WorkNotFound()

        const work = await this.workRepository.updateById(workId, unitId, updateWorkParams)

        return work
    }

    async deleteById(workId: string, unitId: string) {
        const workExist = await this.workRepository.getById(workId, unitId)

        if(workExist == null)
            throw new WorkNotFound()

        const work = await this.workRepository.deleteById(workId, unitId)

        return work
    }
}