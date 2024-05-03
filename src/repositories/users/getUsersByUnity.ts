import { PrismaClient } from "@prisma/client";

export class GetUsersByUnityRepository{
  async execute(unityId:string){
    const prisma = new PrismaClient()

    const users = await prisma.usuario.findMany({
      where:{
        unidadeId: unityId
      }
    })

    return users
  }
}