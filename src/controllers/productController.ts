import { ProductUseCase } from "../useCases/productUseCase"
import { Request, Response } from "express"
import validator from "validator"
import { createProductSchema } from "../schemas/productSchemas"

export class ProductController {
    productUseCase = new ProductUseCase()
    
    /* Chamar a função em um FIlter de getAllProducts */
    async getByName(req: Request, res: Response) {}

    async getById(req: Request, res: Response) {
        const productId = req.params.id

        const isUuid = validator.isUUID(productId) // Mudar Pro Zod????

        if (!isUuid) 
            res.status(400).json({
              message: `The id ${productId} is not valid.`
            })

        try {
            const product = await this.productUseCase.getById(productId)

            if(!product) // verificação necessaria ??? PooductUseCase lança um Erro se N encontrar um produto - VERIFICA
                res.status(404).json({
                    message: 'Product Not Found'
                })

            res.status(200).json(product)

        } catch (error) {
            console.error('Error fetching product by ID:', error);
            
            res.status(500).json({
              message: 'Internal server error'
            }); 
        }
    }

    async getAllProducts(req: Request, res: Response) {
        try {
            const products = this.productUseCase.getAllProduct()

            //Como tratar array vazio

            res.status(200).json(products)

        } catch (error) {
            console.error('Error fetching all product by ID:', error);
            
            res.status(500).json({
              message: 'Internal server error'
            }); 
        }
    }

    async create(req: Request, res: Response) {
        const request_body_validation = createProductSchema.safeParse(req.body)

        if(!request_body_validation.success)
            res.status(200).json({
                errors: request_body_validation.error.formErrors
            })

/*         const { name, description, type } = request_body_validation.data
 */
        try {
            const product = await this.productUseCase.create(req.body)

            res.status(201).json(product)
        } catch (error) {
            console.error('Error creating a product:', error);
            
            res.status(500).json({
              message: 'Internal server error'
            }); 
        }
    }

    async updateById(req: Request, res: Response) {
        const productId = req.params.id
        const requestBody = req.body

        const isUuid = validator.isUUID(productId) // Mudar Pro Zod????

        if (!isUuid) 
            res.status(400).json({
              message: `The id ${productId} is not valid.`
            })

        try {
            const productExist = await this.productUseCase.getById(productId)

            if(!productExist) // verificação necessaria ??? PooductUseCase lança um Erro se N encontrar um produto - VERIFICA
                res.status(404).json({
                    message: 'Product Not Found'
                })
            
            /* Trato os inputs */

            const product = await this.productUseCase.updateById(productId, requestBody)
            
        } catch (error) {
            console.error('Error deleting a product:', error);
            
            res.status(500).json({
              message: 'Internal server error'
            }); 
        }
    }
    
    async deleteById(req: Request, res: Response) {
        const productId = req.params.id
        
        const isUuid = validator.isUUID(productId) // Mudar Pro Zod????

        if (!isUuid) 
            res.status(400).json({
              message: `The id ${productId} is not valid.`
            })


        try {
            const productExist = await this.productUseCase.getById(productId)

            if(!productExist) // verificação necessaria ??? PooductUseCase lança um Erro se N encontrar um produto - VERIFICA
                res.status(404).json({
                    message: 'Product Not Found'
                })
            
            const product = await this.productUseCase.deleteById(productId)

            res.status(200).json({ message: 'Product Deleted Succefully' })
        } catch (error) {
            console.error('Error deleting a product:', error);
            
            res.status(500).json({
              message: 'Internal server error'
            }); 
        }
    }
    
}