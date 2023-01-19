const express = require('express');
require('dotenv').config();
require('./utils/db')
require('./passport');

const passport = require('passport')
const process = require('process')
const path = require('path');//Para la carpeta public
const port = process.env.PORT
const app = express();
const cookieParser = require('cookie-parser');

const routes = require('./routes/front-routes');
const apiRoutes = require('./routes/api-routes');

// require("./facebook")();
// const cookieSession=require('cookie-session');
// const bodyParser = require('body-parser')

//Acceso a carpeta public
app.use(express.static(path.join(__dirname, 'public')));

//Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));


//Middlewares
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Motor de vista
app.set('view engine', 'pug');
app.set('views','./views');

//Routes
app.use('/', routes)
app.use('/api', apiRoutes)

app.get('*', (req, res)=>{
    res.status(404).send("Sorry... 404 Not Found");
});

app.listen(port, () => {
    console.log(`Conectados al puerto ${port}!!`)
});



