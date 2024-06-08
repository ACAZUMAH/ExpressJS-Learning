import express from 'express'
import routes from './routes/entery.js'
import cookieParser from 'cookie-parser'
import session from 'express-session' 

const app = express()

app.use(express.json())

app.use(cookieParser('api-learning'))

app.use(session({
    secret: "api-learning",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60
    }
}))

app.use(routes); 

const PORT = process.env.PORT || 3500

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});

app.get('/', (req, res) => {
    console.log(req.session)
    console.log(req.sessionID)
    res.cookie('message', 'Welcome', {maxAge: 60000 * 60, signed: true})
    res.status(200).send('Welcome')
})
// Apply middleware (commented out for now)
// app.use(LoggingMiddleWare);

// app.get()

// app.post()

// app.put()

//app.patch()

// app.delete()

