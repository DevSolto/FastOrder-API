import { PrismaClient } from "@prisma/client";

export class GetUserByEmailRepository{
  async execute(userEmail:string){
    const prisma = new PrismaClient()
    const user = await prisma.usuario.findUnique({
      where:{
        email:userEmail
      }
    })
    return user
  }
}