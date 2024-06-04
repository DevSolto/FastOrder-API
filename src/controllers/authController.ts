import { Request, Response } from "express"
import { loginSchema } from "../schemas/authSchemas"
import { RequestHttpResponse } from "../types"
import { UserUseCase } from "../useCases/userUseCase"
import { UserJWTPayload } from "../types"

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import "dotenv/config"

export class AuthController {
    userUseCase = new UserUseCase()

    async login(req: Request, res: Response) {
        const httpResponse: RequestHttpResponse = {
            status: 200,
            success: true,
            message: "User Autenticated Succefully"
        }

        const request_body_validation = await loginSchema.safeParseAsync(req.body)

        if (!request_body_validation.success) {
            httpResponse.status = 400
            httpResponse.success = false
            httpResponse.message = "Unable to authenticate, please check the values"
            httpResponse.errors = request_body_validation.error.formErrors.fieldErrors

            return res.status(httpResponse.status).json(httpResponse)
        }

        const { email, password } = request_body_validation.data

        try {
            const user = await this.userUseCase.getByEmail(email)

            if (!user) {
                httpResponse.status = 400
                httpResponse.success = false
                httpResponse.message = 'Invalid Credentials'

                return res.status(httpResponse.status).json(httpResponse)
            }

            const password_matches = await bcrypt.compare(password, user.password)

            if (!password_matches) {
                httpResponse.status = 400
                httpResponse.success = false
                httpResponse.message = 'Invalid Credentials'

                return res.status(httpResponse.status).json(httpResponse)
            }

            const jwt_payload: UserJWTPayload = {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }

            const { SECRET } = process.env

            const jwt_token = jwt.sign(jwt_payload, SECRET ?? "secret")

            httpResponse.data = { token: jwt_token }

            return res.status(httpResponse.status).json(httpResponse)

        } catch (error) {
            console.error('Error creating a user:', error);

            httpResponse.status = 500
            httpResponse.success = false
            httpResponse.message = 'Internal server error'

            return res.status(httpResponse.status).json(httpResponse);
        }
    }
}