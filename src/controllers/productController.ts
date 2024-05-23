import { ProductUseCase } from "../useCases/productUseCase"
import { Request, Response } from "express"
import validator from "validator"
import { createProductSchema, updateProductSchema } from "../schemas/productSchemas"
import { RequestHttpResponse } from "../types"

export class ProductController {
    productUseCase = new ProductUseCase()
    
    /* Chamar a função em um FIlter de getAllProducts */
    //async getByName(req: Request, res: Response) {}

    async getById(req: Request, res: Response) {
        const productId = req.params.id

        const httpResponse: RequestHttpResponse = {
            status: 200,
            success: true,
            message: "Lista de Produtos"
        }

        const isUuid = validator.isUUID(productId) // Mudar Pro Zod????

        if (!isUuid) {
            httpResponse.status - 400
            httpResponse.success = false
            httpResponse.message = `The id ${productId} is not valid.`
            
            return res.status(httpResponse.status).json(httpResponse)
        }

        try {
            const product = await this.productUseCase.getById(productId)

            if(!product) { // verificação necessaria ??? PooductUseCase lança um Erro se N encontrar um produto - VERIFICA
                httpResponse.status = 404
                httpResponse.success = false
                httpResponse.message =  'Product Not Found'

                return res.status(httpResponse.status).json(httpResponse)
            }    

           return res.status(httpResponse.status).json(product)

        } catch (error) {
            console.error('Error fetching product by ID:', error);

            httpResponse.status = 500
            httpResponse.success = false
            httpResponse.message = 'Internal server error'
            
           return  res.status(httpResponse.status).json(httpResponse); 
        }
    }

    async getAllProducts(req: Request, res: Response) {
        const httpResponse: RequestHttpResponse = {
            status: 200,
            success: true,
            message: "Lista de Produtos"
        }

        /* Adicionar FIltro, Ordenação e Paginação */

        try {
            const products = await this.productUseCase.getAllProduct()

            httpResponse.data = products
            
            return res.status(httpResponse.status).json(httpResponse)

        } catch (error) {
            console.error('Error fetching all product by ID:', error);
            
            httpResponse.status = 500
            httpResponse.success = false
            httpResponse.message = 'Internal server error'
            
           return  res.status(httpResponse.status).json(httpResponse); 
        }
    }

    async create(req: Request, res: Response) {
        const request_body_validation = await createProductSchema.safeParseAsync(req.body)

        const httpResponse: RequestHttpResponse = {
            status: 200,
            success: true,
            message: "Produto Criado com Sucesso"
        }

        if(!request_body_validation.success){
            httpResponse.status = 400
            httpResponse.success = false
            httpResponse.message = "Não foi possivel criar o produto, verifique os valores dos campos"
            httpResponse.errors = request_body_validation.error.formErrors.fieldErrors
            
            return res.status(httpResponse.status).json(httpResponse)
        }

        try {
            const product = await this.productUseCase.create(request_body_validation.data)

            res.status(201).json(product)
        } catch (error) {
            console.error('Error creating a product:', error);
            
            httpResponse.status = 500
            httpResponse.success = false
            httpResponse.message = 'Internal server error'
            
           return  res.status(httpResponse.status).json(httpResponse); 
        }
    }

    async updateById(req: Request, res: Response) {
        const productId = req.params.id

        const httpResponse: RequestHttpResponse = {
            status: 200,
            success: true,
            message: "Produto Atualizado com Sucesso"
        }

        const isUuid = validator.isUUID(productId) // Mudar Pro Zod????
        const request_body_validation = await updateProductSchema.safeParseAsync(req.body)

        if (!isUuid) {
            httpResponse.status = 400
            httpResponse.success = false
            httpResponse.message = `The id ${productId} is not valid.`
            
            return res.status(httpResponse.status).json(httpResponse)
        }

        if(!request_body_validation.success){
            httpResponse.status = 400
            httpResponse.success = false
            httpResponse.message = "Não foi possivel atualizar o produto, verifique os valores dos campos"
            httpResponse.errors = request_body_validation.error.formErrors.fieldErrors
            
            return res.status(httpResponse.status).json(httpResponse)
        }
        try {
            const productExist = await this.productUseCase.getById(productId)

            if(!productExist) { // verificação necessaria ??? PooductUseCase lança um Erro se N encontrar um produto - VERIFICA
                httpResponse.status = 404
                httpResponse.success = false
                httpResponse.message =  'Product Not Found'

                return res.status(httpResponse.status).json(httpResponse)
            }    
            
            const product = await this.productUseCase.updateById(productId, request_body_validation.data)
            
            
            return res.status(httpResponse.status).json(httpResponse)
        } catch (error) {
            console.error('Error deleting a product:', error);
            
            httpResponse.status = 500
            httpResponse.success = false
            httpResponse.message = 'Internal server error'
            
           return  res.status(httpResponse.status).json(httpResponse); 
        }
    }
    
    async deleteById(req: Request, res: Response) {
        const productId = req.params.id
        
        const httpResponse: RequestHttpResponse = {
            status: 200,
            success: true,
            message: 'Product Deleted Succefully'
        }

        const isUuid = validator.isUUID(productId) // Mudar Pro Zod????

        if (!isUuid) {
            httpResponse.status = 400
            httpResponse.success = false
            httpResponse.message = `The id ${productId} is not valid.`
            
            return res.status(httpResponse.status).json(httpResponse)
        }

        try {
            const productExist = await this.productUseCase.getById(productId)

            if(!productExist) { // verificação necessaria ??? PooductUseCase lança um Erro se N encontrar um produto - VERIFICA
                httpResponse.status = 404
                httpResponse.success = false
                httpResponse.message =  'Product Not Found'

                return res.status(httpResponse.status).json(httpResponse)
            }    
            
            const product = await this.productUseCase.deleteById(productId)


            return res.status(httpResponse.status).json(httpResponse)
        } catch (error) {
            console.error('Error deleting a product:', error);
            
            httpResponse.status = 500
            httpResponse.success = false
            httpResponse.message = 'Internal server error'
            
           return  res.status(httpResponse.status).json(httpResponse); 
        }
    }
    
}