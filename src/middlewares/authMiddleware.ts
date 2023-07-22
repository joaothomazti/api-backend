import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { UnauthorizedError } from '../helpers/api-erros'
import { userRepository } from '../repositories/userRepository'


type JwtPayload = {
	id: number
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1]
    

    if(!token) {
        throw new UnauthorizedError('Token not provided')
        
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY ?? '') as JwtPayload

    const user = await userRepository.findOneBy({id})

    if(!user){
        throw new UnauthorizedError('User has not been authenticated')
    }
    
    const {password:_, ...userLogged} = user

    req.user = userLogged
    
    next();
}