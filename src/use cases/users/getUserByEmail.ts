import { GetUserByEmailRepository } from "../../repositories/users/getUserByEmail";

export class GetUserByEmailUseCase{
  async execute(userEmail:string){
    const getUserByEmailRepository = new GetUserByEmailRepository()
    const user = await getUserByEmailRepository.execute(userEmail)
    return user
  }
}