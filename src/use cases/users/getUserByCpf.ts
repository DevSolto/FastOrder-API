import { GetUserByCpfRepository } from "../../repositories/users/getUserByCpf";

export class GetUserByCpfUseCase{
  async execute(cpf:string){
    const getUserByCpfRepository = new GetUserByCpfRepository()
    const user = await getUserByCpfRepository.execute(cpf)

    return user
  }
}