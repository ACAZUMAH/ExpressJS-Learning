import passport from 'passport';
import { Strategy } from 'passport-local';
import { users } from '../models/data.js';

passport.serializeUser((user, done) =>{
    console.log('inside serialize user')
    console.log(user)
    done(null, user.id)
})

passport.deserializeUser((id, done) =>{
    try {
        console.log('inside deserialize user')
        console.log(`deserialize user ${id}`)
        const findUser = users.find((user) => user.id === id)
        if(!findUser)
            throw new Error('User not found')

        done(null, findUser)

    } catch (error) {
        done(error, null)
    }
})

export default passport.use(
    new Strategy((username, password, done) =>{
        try {
            //console.log(`username: ${username}`)
            //console.log(`password: ${password}`)
            const findUser = users.find((user) => user.username === username)
            if(!findUser)
                throw new Error('User not foumd')
            if(findUser.password !== password)
                throw new Error('Invalid credentials')
            return done(null, findUser)
        
        } catch (error) {
            done(error, null)
        }
    })
)