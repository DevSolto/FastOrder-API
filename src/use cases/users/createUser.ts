import bcrypt from "bcrypt"
import { CreateUserRepository } from "../../repositories/users/createUser"
import { GetUserByEmailRepository } from "../../repositories/users/getUserByEmail"
import { GetUserByCpfRepository } from "../../repositories/users/getUserByCpf"
import { CpfAlreadyInUseError, EmailAlreadyInUseError } from "../../errors/user"


export class CreateUserUseCase{
  async execute(createUserParams:{cpf:string,nome:string,email:string,senha:string}){
    
    const getUserByEmailRepository = new GetUserByEmailRepository()
    const emailAlreadyRegistered = await getUserByEmailRepository.execute(createUserParams.email)
    if(emailAlreadyRegistered){
      throw new EmailAlreadyInUseError(createUserParams.email)
    }
    const getUserByCpfRepository = new GetUserByCpfRepository()
    const CpfAlreadyRegistered = await getUserByCpfRepository.execute(createUserParams.cpf)
    if(CpfAlreadyRegistered){
        throw new CpfAlreadyInUseError(createUserParams.cpf)
    }

    const hashedPassword = await bcrypt.hash(createUserParams.senha, 10)
    const user = {
      ...createUserParams,
      senha:hashedPassword
    }
    const createUserRepository = new CreateUserRepository()
    const userCreated = await createUserRepository.execute(user)
    
    return userCreated
  }
}