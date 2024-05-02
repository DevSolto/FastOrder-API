import { PrismaClient } from '@prisma/client';


export class CreateUserRepository{
 async execute(createUserParams:{cpf:string,nome:string,email:string,senha:string}){
  const prisma = new PrismaClient();
    const userCreated = await prisma.usuario.create({
      data:{
        cpf: createUserParams.cpf,
        nome: createUserParams.nome,
        email: createUserParams.email,
        senha: createUserParams.senha,
      }
    })
    
    return userCreated
  }
} 