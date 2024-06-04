import { Request, Response, NextFunction } from "express"
import { RequestHttpResponse } from "../types"
import jwt, { JsonWebTokenError } from "jsonwebtoken"
import { UserJWTPayload } from "../types"
import { jwtDecode } from "jwt-decode";

import "dotenv/config"

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    const httpResponse: RequestHttpResponse = {
        status: 400,
        success: false,
        message: "Authorization Header not Found"
    }

    const { authorization } = req.headers

    if (!authorization)
        return res.status(httpResponse.status).json(httpResponse)

    const [_, token] = authorization.split(' ')

    const { SECRET } = process.env

    try {
        jwt.verify(token, SECRET ?? 'secret')

        return next()
    } catch (err) {
        if (err instanceof JsonWebTokenError) {
            httpResponse.message = err.message
        } else {
            httpResponse.message = "Failed to Verify JWT"
        }
    }

    return res.status(httpResponse.status).json(httpResponse)
}


export const is = (roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { authorization } = req.headers

        const [_, token] = authorization!.split(' ')

        const user_payload = jwtDecode<UserJWTPayload>(token)

        if(!roles.includes(user_payload.role)) {
            const httpResponse: RequestHttpResponse = {
                status: 400,
                success: false,
                message: "Not Permission"
            }

            return res.status(httpResponse.status).json(httpResponse)
        }
        
        next()
    }
}

