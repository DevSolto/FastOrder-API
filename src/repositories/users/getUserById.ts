import { PrismaClient } from "@prisma/client";

export class GetUserByIdRepository{
  async execute(userId:string){
    const prisma = new PrismaClient()
    const user = await prisma.usuario.findUnique({
      where:{
        id: userId
      }
    })
    return user
  }
}