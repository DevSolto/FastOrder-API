import { PrismaClient } from "@prisma/client";

export class UserRepository{
    async getById(idUser:string){
        const prisma = new PrismaClient() // essa instancia e o workbench
        const user = prisma.user.findUnique({
            where:{
                id:idUser
            }
        })
        return user
        
    }
}