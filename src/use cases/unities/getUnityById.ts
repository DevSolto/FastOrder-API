import { GetUnityByIdRepository } from "../../repositories/unities/getUnityById"

export class GetUnityByIdUseCase{
  async execute(unityId:string){
    const getUnityByIdRepository = new GetUnityByIdRepository()

    const unity = await getUnityByIdRepository.execute(unityId)

    return unity
  }
}