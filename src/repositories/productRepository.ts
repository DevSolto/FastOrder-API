import { PrismaClient, Type } from "@prisma/client";
import { createProductParams, updateProductParams } from "../types";

// Classe que representa o repositório de produtos, responsável por interagir com o banco de dados
export class ProductRepository {
    prisma = new PrismaClient()

    public async getByName(name: string) {
        const product = await this.prisma.product.findUnique({
            where: { name }
        });

        return product;
    }

    public async create(createProductParams: createProductParams) {
        const product = await this.prisma.product.create({
            data: createProductParams
        })

        return product
    }

    public async getAllProducts() {
        const products = await this.prisma.product.findMany()

        return products
    }

    public async getById(productId: string) {
        const product = await this.prisma.product.findUnique({
            where: {id: productId}
        })

        return product
    }

    public async updateById(productId: string, updateProductParams: updateProductParams) {
        const productUpdated = await this.prisma.product.update({
            where: {id: productId},
            data: updateProductParams
        })

        return productUpdated
    }

    public async deleteById(productId: string) {
        const productDeleted = await this.prisma.product.delete({
            where: {id: productId}
        })

        return productDeleted
    }
}