import { ProductRepository } from "../repositories/productRepository"
import { createProductParams, updateProductParams } from "../types" 
import { ProductNameIsBeingUsed, ProductNotFound } from "../errors/productErro"

export class ProductUseCase {
    productRepository = new ProductRepository

    async getByName(name: string) {
        const product = await this.productRepository.getByName(name)

        return product
    } 

    async getById(productId: string) {
        const product = await this.productRepository.getById(productId)

        return product
    }

    getAllProduct = async () => {
        const products = await this.productRepository.getAllProducts()

        return products
    }

    async create(createProductParams: createProductParams) {
        const productByName = await this.productRepository.getByName(createProductParams.name)

        if(productByName != null) 
            throw new ProductNameIsBeingUsed(productByName.name)

        const product = await this.productRepository.create(createProductParams)

        return product
    }


    async updateById(productId: string, updateProductParams: updateProductParams) {
        const productExist = await this.productRepository.getById(productId)

        if(productExist == null)
            throw new ProductNotFound()

        if(updateProductParams.name) {
            const productByName = await this.productRepository.getByName(updateProductParams.name)

            if(productByName != null) 
                throw new ProductNameIsBeingUsed(updateProductParams.name)
        }

        const product = await this.productRepository.updateById(productId, updateProductParams)

        return product
    }

    async deleteById(productId: string) {
        const productExist = await this.productRepository.getById(productId)

        if(productExist == null)
            throw new ProductNotFound()

        const product = await this.productRepository.deleteById(productId)

        return product
    }
}