import { PrismaClient } from "@prisma/client";

export class GetUsersRepository{
  async execute(){
    const prisma = new PrismaClient()
    const users = await prisma.usuario.findMany()
    return users
  }
}