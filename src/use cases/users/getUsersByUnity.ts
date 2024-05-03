import { GetUsersByUnityRepository } from "../../repositories/users/getUsersByUnity";

export class GetUsersByUnityUseCase{
  async execute(unityId:string){
    const getUsersByUnityRepository = new GetUsersByUnityRepository()
    const users = await getUsersByUnityRepository.execute(unityId)
    return users
  }
}