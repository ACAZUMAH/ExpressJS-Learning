import { Router } from 'express'

const router = Router()

router.get('/api/products', (req, res) =>{
    //console.log(req.headers.cookie)
    //console.log(req.cookies)
    //console.log(req.signedCookies.message)
    if(req.signedCookies.message && req.signedCookies.message === "Welcome"){
        return res.send([{id: 1, 'name': 'Gobe3', 'price': 15.05}])
    }else{
        return res.status(403).send('Sorry, you are not allowed to view this page.')
    }
})

export default router
