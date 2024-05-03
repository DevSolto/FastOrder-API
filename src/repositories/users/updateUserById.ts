import { PrismaClient } from "@prisma/client";

export class UpdateUserByIdRepository{
  async execute(userId:string,updateUserPrams:{cpf?:string,nome?:string,email?:string,senha?:string}){
    const prisma = new PrismaClient()
    const userUpdated = await prisma.usuario.update({
      where:{
        id:userId
      },
      data:updateUserPrams
    })

    return userUpdated
  }
}