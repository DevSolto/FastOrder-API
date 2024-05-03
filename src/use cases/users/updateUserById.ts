import { CpfAlreadyInUseError, EmailAlreadyInUseError } from "../../errors/user"
import { GetUserByCpfRepository } from "../../repositories/users/getUserByCpf"
import { GetUserByEmailRepository } from "../../repositories/users/getUserByEmail"
import { UpdateUserByIdRepository } from "../../repositories/users/updateUserById"
import bcrypt from "bcrypt"


export class UpdateUserByIdUseCase{
  async execute(userId:string, updateUserPrams:{cpf?:string,nome?:string,email?:string,senha?:string}){
    if(updateUserPrams.email){
      const getUserByEmailRepository = new GetUserByEmailRepository()
      const emailAlreadyRegistered = await getUserByEmailRepository.execute(updateUserPrams.email)
      if(emailAlreadyRegistered){
        if(emailAlreadyRegistered.id !== userId){
          throw new EmailAlreadyInUseError(updateUserPrams.email)
        }
      }
    }
    if(updateUserPrams.cpf){
      const getUserByCpfRepository = new GetUserByCpfRepository()
      const cpfAlreadyRegistered = await getUserByCpfRepository.execute(updateUserPrams.cpf)
      if(cpfAlreadyRegistered){
        if(cpfAlreadyRegistered.id!==userId){
          throw new CpfAlreadyInUseError(updateUserPrams.cpf)
        }
      }
    }

    if(updateUserPrams.senha){
      const hashedPassword = await bcrypt.hash(updateUserPrams.senha, 10)
      updateUserPrams = {
        ...updateUserPrams,
        senha:hashedPassword
      }
    }

    const updateUserByIdRepository = new UpdateUserByIdRepository()

    const userUpdated = await updateUserByIdRepository.execute(userId, updateUserPrams)

    return userUpdated
  }
}