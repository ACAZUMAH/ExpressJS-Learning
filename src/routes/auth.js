import { Router } from 'express';
import passport from 'passport'
import { checkSchema, validationResult, matchedData } from "express-validator"
import { createUserValidationSchama, loginValidationSchema } from "../utils/validationSchamas.js"
import { users } from '../models/data.js'
import '../Strategies/local-strategy.js'

const router = Router()

router.post('/api/auth',passport.authenticate('local'), (req, res) =>[
    res.status(200).send('Authenticated')
])

router.post('/api/auth/login',checkSchema(loginValidationSchema),(req,res) => {
    const { 
        body: {username, password} 
    } = req
    const result = validationResult(req)
    if(!result.isEmpty()){
        res.status(400).send(result.array())
    }else{
        const findUser = users.find((user) => user.username === username)
        if(!findUser || findUser.password !== password){
            res.status(401).send('Unthorized')
        }else{
            req.session.user = findUser
            res.status(200).send(findUser)
        }
        
    }

})

router.get('/api/auth/status', (req,res) => {
    // req.sessionStore.get(req.sessionID, (err, session) =>{
    //     if(err){
    //         console.log(err)
    //     }
    
    // })
    // return req.session.user
    //   ? res.status(200).send(req.session.user)
    //   : res.status(401).send('Unauthorized')
    console.log('status endpoint')
    console.log(req.user)
    return req.user
        ? res.status(200).send(req.user)
        : res.status(401).send('Unauthorized')
})


export default router