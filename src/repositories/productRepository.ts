// Importando Banco de dados
import { PrismaClient, Role, Type } from "@prisma/client";

// Tornando a classe visível 
export class productsRepositories{
    prisma = new PrismaClient()

    public async getByName(name:string){
     
    // Método para encontrar produto pelo nome 
    const product = await this.prisma.product.findUnique({
        where:{
           name:name
        }
    })
    return product;
    }
    // Método para criar novo produto

    async create(createProductParams:{
        id:string
        name:string
        description:string
        type:Type
        
    }){
        const product = await this.prisma.product.create({
            data:createProductParams
        })
        return product;
    }

    // Método para buscar todos os produtos 
    async getAllProducts(){

    const product = await this.prisma.product.findMany()
    return product;
} 

    // Método para buscar produto pelo Id
    async getById(productId:string){
        const order = await this.prisma.product.findUnique({
            where:{
                id:productId
            }
        })
        return productId;
}
    // Método para atualizar produto pelo Id 

    async updateById(productId:string, productParams:{
        name:string
        description:string
        type:Type
    }){
        const product = await this.prisma.product.update({
            where:{
                id:productId
            },
            data:productParams
        
        })
         return product
}
    // Método para excluir produto pelo id 
    async deleteById(produtctId:string){
        const product = await this.prisma.product.delete({
            where:{
                id:produtctId
            }
        })
        return product // aqui não sabia se devia retornar ja que teoricamente ta excluindo 
    }
}