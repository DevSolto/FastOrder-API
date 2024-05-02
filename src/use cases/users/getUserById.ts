import { GetUserByIdRepository } from "../../repositories/users/getUserById";

export class GetUserByIdUseCase{
  async execute(userId:string){
    const getUserByIdRepository = new GetUserByIdRepository()
    const user = await getUserByIdRepository.execute(userId)
    return user
  }
}