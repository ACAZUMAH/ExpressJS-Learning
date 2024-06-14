import { Router } from "express"
import { checkSchema, validationResult, matchedData } from "express-validator"
import { queryValidationSchema,createUserValidationSchama } from "../utils/validationSchamas.js"
import { users } from '../models/data.js'
import { resolveUserById } from "../utils/middleWares.js"

const router = Router()

router.get('/api/users',checkSchema(queryValidationSchema),(req, res) => {
    console.log(req.session)
    console.log(req.sessionID)
    const {
        query: { filter, value }
    } = req
    if (filter || value) {
        const result = validationResult(req);
        if(!result.isEmpty()){
            res.status(400).send(result.array());
            return;
        }   
        return res.status(200).send(
            users.filter((user) => user[filter].includes(value))
        )
    }
    if(!filter && !value){
        res.status(200).send(users);
        return;
    }
})

router.get('/api/users/:id', resolveUserById, (req, res) => {
            const { userIndex } = req;
            if(userIndex === undefined){
                res.sendStatus(404);
                return
            }
            const finduser = users[userIndex];
            if (!finduser) {
                res.sendStatus(404);
                return;
            }
            res.status(200).send(finduser);
    }
)

router.post('/api/users/post', checkSchema(createUserValidationSchama), (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.status(400).send(result.array());
        return;
    }
    const data = matchedData(req);
    if(!data.username || !data.name){
        res.sendStatus(400);
        return;
    }
    const newUser = { id: users[users.length - 1].id + 1, ...data};
    users.push(newUser);
    res.status(201).send(newUser);
})

router.put('/api/update/:id', resolveUserById, (req, res) => {
    const { body, userIndex } = req;
    if(userIndex === undefined){
        res.sendStatus(404);
        return
    }
    users[userIndex] = { id: users[userIndex].id, ...body };
    res.sendStatus(200);
})

export default router
