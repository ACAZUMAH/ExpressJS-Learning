import { Router } from 'express'

import usersRouters from './userRouter.js'
import productRouters from './productsRouter.js'
import authRouter from './auth.js'

const router = Router()

router.use(authRouter)
router.use(usersRouters)
router.use(productRouters)

export default router 
