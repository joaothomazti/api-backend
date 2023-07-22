import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import { BadRequestError } from "../helpers/api-erros";
import bcrypt from 'bcrypt'
import { User } from "../entity/User";


export class UserController {
    async create(req: Request, res: Response){  
        
        const {fullName, username, email, password} = req.body

        const userExists = await userRepository.findOneBy({username})
        const emailExists = await userRepository.findOneBy({email})
        if(userExists || emailExists){
            throw new BadRequestError('username or email already exists')
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const user = userRepository.create({
            fullName,
            username,
            email,
            password: hashPassword
        })

        await userRepository.save(user)

        
        const {password:_, ...newUser} = user

        return res.status(201).json(newUser)
    }
}