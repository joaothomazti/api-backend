import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'


const userSchema = z.object({
    fullName: z.string(),
    username: z.string().min(4),
    email: z.string().email(),
    password: z.string().min(6)
})


export const validateCreateUser = (req: Request, res: Response, next: NextFunction) => {
    try{
        userSchema.parse(req.body)
        next()
    }catch (err: any) {
        const errorMesssage = JSON.parse(err.message)[0].message
        return res.status(400).json({error: errorMesssage})
    }
}
