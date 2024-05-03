import { PrismaClient, Tipo } from "@prisma/client";

export class CreateUnityRepository{
    async execute(createUnityParams:{nome:string, descricao:string, tipo:string}){

        const prisma = new PrismaClient()
        const tipo =  createUnityParams.tipo ==="FORNECEDOR" ? Tipo.FORNECEDORA : Tipo.VENDEDORA;
        const unity = await prisma.unidade.create({
            data:{
                nome:createUnityParams.nome,
                descricao:createUnityParams.descricao,
                tipo
            }
        })
        return unity
    }
}