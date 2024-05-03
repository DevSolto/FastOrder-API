import { DeleteUserByIdRepository } from "../../repositories/users/deleteUserById";

export class DeleteUserByIdUseCase{
  async execute(userId:string){
    const deleteUserByIdUseCase = new DeleteUserByIdRepository()
    const user = await deleteUserByIdUseCase.execute(userId)
    return user
  }
}