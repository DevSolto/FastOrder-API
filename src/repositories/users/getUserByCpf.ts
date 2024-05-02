import { PrismaClient } from "@prisma/client";

export class GetUserByCpfRepository{
  async execute(cpf:string){
    const prisma = new PrismaClient()
    const user = await prisma.usuario.findUnique({
      where:{
        cpf
      }
    })
    return user
  }
}