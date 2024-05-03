import { PrismaClient } from "@prisma/client";

export class GetUnityByIdRepository{
  async execute(unityId:string){
    const prisma = new PrismaClient()

    const unity = await prisma.unidade.findUnique({
      where:{
        id:unityId
      }
    })

    return unity
  }
}