import { PrismaClient } from "@prisma/client";

export class DeleteUserByIdRepository{
  async execute(userId:string){
    const prisma = new PrismaClient()
    const user = await prisma.usuario.delete({
      where:{
        id:userId
      }
    })
    return user
  }
}