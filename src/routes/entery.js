import { Router } from 'express'

import usersRouters from './userRouter.js'
import productRouters from './productsRouter.js'

const router = Router()

router.use(usersRouters)
router.use(productRouters)

export default router 
