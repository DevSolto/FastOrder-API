import { GetUsersRepository } from "../../repositories/users/getUsers";

export class GetUsersUseCase{
  async execute(){
    const getUsersRepository = new GetUsersRepository()
    const users = await getUsersRepository.execute()

    return users
  }
}