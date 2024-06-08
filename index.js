import express from 'express'

import { query, validationResult, body, matchedData, checkSchema } from 'express-validator'
import { createUserValidationSchama } from './dist/utils/validationSchamas.js'
const app = express()

app.use(express.json())

const LoggingMiddleWare = (req,res,next) =>{
    console.log(`${req.method} - ${req.url}`) 
    next()
}
const resolveUserById = (req, res, next) => {
    const {
        params: { id } 
    } = req  
    const parseId = parseInt(id)
    if(isNaN(parseId)){
        return res.sendStatus(400)
    }
    const userIndex = users.findIndex(user => user.id === parseId)
    if(userIndex === -1){
        return res.sendStatus(404)
    }
    req.userIndex = userIndex
    next() 
}
//app.use(LoggingMiddleWare) 

const users = [
    {'id': 1, 'username': 'Caleb', 'Name': 'Caleb'},
    {'id': 2, 'username': 'Asakwin', 'Name': 'Asak'},
    {'id': 3, 'username': 'Hafiz', 'Name': 'Hafi'},
    {'id': 4, 'username': 'Dragon', 'Name': 'Donatus'},
    {'id': 5, 'username': 'Azumah', 'Name': 'Azum'},
    {'id': 6, 'username': 'Eben', 'Name': 'Adel'},
    {'id': 7, 'username': 'Lamer', 'Name': 'Ken'}
]

app.get('/', (req,res)=>{
    res.status(200).send({"message": "HELLO!"})
}) 

app.get(
    '/api/users', 
    query('filter')
    .isString()
    .notEmpty()
    .withMessage('Filter is required')
    .isLength({min: 3, max: 10})
    .withMessage('Filter must be between 3 and 10 characters'), 
    (req,res)=>{
        const result = validationResult(req)
        console.log(result.errors)
        const { 
            query : {filter,
                value} 
        } = req

        if(!filter && !value){
            return res.status(200).send(users)
        }
        if(filter && value){
            const filtered = users.filter(user => user[filter].includes(value))
            return res.status(200).send(filtered)
        }
        res.status(200).send(users)
    }
)

app.post('/api/users/post',checkSchema(createUserValidationSchama),(req,res )=> {
    const result = validationResult(req)
    //console.log(result)
    if(!result.isEmpty()){
        return res.status(400).send(result.errors)
    }
    const data = matchedData(req)
    const newUser = { 'id': users[users.length -1].id + 1, ...data }
    users.push(newUser)
    res.status(201).send(newUser)
})

app.put('/api/update/:id', resolveUserById, (req,res) => {
    const { body, userIndex } = req 
    users[userIndex] = { id: users[userIndex].id, ... body }
    return res.sendStatus(200)

})

app.get('/api/users/:id',resolveUserById, (req,res)=>{
    const { userIndex } = req
    const finduser = users[userIndex]
    if(!finduser){
        return res.sendStatus(404)
    }
    return res.status(200).send(finduser)
})
const PORT = process.env.PORT || 3500

app.listen(PORT, ()=>{
    console.log(`Listening on ${PORT}`)
})

