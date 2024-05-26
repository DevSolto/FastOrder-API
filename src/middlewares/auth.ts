import {Request, Response, NextFunction} from "express"
import {RequestHttpResponse} from "../types"
import jwt, {JsonWebTokenError} from "jsonwebtoken"
import "dotenv/config"

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    const httpResponse: RequestHttpResponse = {
        status: 400,
        success: false,
        message: "Authorization Header not Found"
    }

    const {authorization} = req.headers

    if(!authorization)
        return res.status(httpResponse.status).json(httpResponse)

    const [_, token] = authorization.split(' ')

    const { SECRET } = process.env

    console.log(authorization)

    jwt.verify(token, SECRET ?? "secret",  (err, decode)=> {
        console.log(err, decode);

        if(err instanceof JsonWebTokenError) {
            httpResponse.message = err.message

            return res.status(httpResponse.status).json(httpResponse)
        } else {
            return next()
        }
    })
}







export const is =  async(roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {

    }
}

