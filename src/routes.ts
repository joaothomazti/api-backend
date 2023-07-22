import {Router} from 'express'
import { UserController } from './controllers/UserController'
import { AuthController } from './controllers/AuthController'
import { authMiddleware } from './middlewares/authMiddleware'
import { validateCreateUser } from './middlewares/validateCreateUser'

const routes = Router()


routes.post('/users',validateCreateUser, new UserController().create)
routes.post('/login', new AuthController().login)



routes.use(authMiddleware)
routes.get('/logged', new AuthController().getProfile)



export default routes