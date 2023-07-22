import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import { BadRequestError } from "../helpers/api-erros";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class AuthController {
    async login(req: Request, res: Response){
        const {email, password} = req.body

        const user = await userRepository.findOneBy({email})

        if(!user){
            throw new BadRequestError('Invalid email or password')
        }

        const verifyPassword = await bcrypt.compare(password, user.password)

        if(!verifyPassword){
            throw new BadRequestError('Invalid email or password')
        }

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET_KEY ?? '', {
            expiresIn: "1d"
        })

        const {password:_, ...newUser} = user

        return res.json({
            user: newUser,
            access_token: token
        })
    }

    async getProfile(req: Request, res: Response){
        return res.json(req.user)
    }
}